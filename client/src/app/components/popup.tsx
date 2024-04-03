import { socket } from "@/lib/socket";
import { Match } from "@prisma/client";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const url = process.env.SOCKET_URL || "ws://localhost:8080"

export const Popup = ({ onClose, match }: { onClose: () => void; match: Match | null }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [input, setInput] = useState('');
    const [score1,setScore1] = useState<number[]>([0,0]);
    const [score2,setScore2] = useState<number[]>([0,0]);
    const [score3,setScore3] = useState<number[]>([0,0]);

    useEffect(() => {
        const socket = io(url);
        setSocket(socket);
        socket.emit("join-room", match?.id);

        socket.on('receive-score', (data) => {
            const { idx, newScore } = data;
            switch(idx) {
                case 0:
                    setScore1(newScore);
                    break;
                case 1:
                    setScore2(newScore);
                    break;
                case 2:
                    setScore3(newScore);
                    break;
                default:
                    console.log("Invalid set index received");
            }
          });

        return () => {
            socket.emit("leave-room", match?.id);
            socket.disconnect();
        };
    }, [match?.id]);

    useEffect(() => {
        if (match?.score1 && match.score2 && match?.score1.length==match?.score2.length) {
            for (let i = 0; i < match?.score1.length; i++) {
                const newscore : number[] = []
                newscore.push(match.score1[i], match.score2[i]);
                if (i===0) {
                    setScore1(newscore);
                } else if (i===1) {
                    setScore2(newscore);
                } else {
                    setScore3(newscore);
                }
            }
        }
    }, [match?.score1,match?.score2]);

    console.log(score1,score2,score3)

    const handleSubmit = async () => {
        const formData =  new FormData()

        if (match && match.id) {
            formData.append('id', match.id);
        } else {
            console.log("Match ID is undefined.");
        }

        const scoreData = [score1,score2,score3]
        formData.append('score',JSON.stringify(scoreData))

        try {
            const response = await fetch('/api/match/updateScore', {
                method: 'PUT',
                body: formData,
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log('Score update response:', responseData);
            } else {
                console.error('Failed to update score. Status:', response.status);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-1/2">
                <p className="text-lg font-bold mb-4">Match ID: {match?.id}</p>
                <div className="mt-4 space-y-4">
                {['Score 1', 'Score 2', 'Score 3'].map((scoreLabel, idx) => {
                    const score = [score1, score2, score3][idx];
                    const setScore = [setScore1, setScore2, setScore3][idx];

                    const increment = (index: number) => {
                        const newScore = [...score]; 
                        newScore[index] = newScore[index] + 1; 
                        setScore(newScore); 

                        socket?.emit('update-score', {idx ,newScore},match?.id)
                    };

                    
                    const decrement = (index: number) => {
                        const newScore = [...score]; 
                        newScore[index] = Math.max(0, newScore[index] - 1); 
                        setScore(newScore);

                        socket?.emit('update-score', {idx ,newScore},match?.id)
                    };

                    return (
                    <div key={scoreLabel} className="flex justify-between items-center">
                        <p className={`font-semibold ${['text-blue-500', 'text-green-500', 'text-red-500'][idx]}`}>{scoreLabel}:</p>
                        <div className="flex items-center space-x-2">
                        {score.map((s, scoreIdx) => (
                            <div key={scoreIdx} className="flex items-center space-x-1">
                            <button onClick={() => increment(scoreIdx)} className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">+</button>
                            <p className="text-sm bg-gray-100 text-gray-800 py-1 px-3 rounded-full">{s}</p>
                            <button onClick={() => decrement(scoreIdx)} className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">-</button>
                            </div>
                        ))}
                        </div>
                    </div>
                    );
                })}
                </div>
                <button onClick={handleSubmit} className="px-4 py-2 mt-10 bg-blue-500 text-white rounded">
                    Submit
                </button>
                <button onClick={onClose} className="mt-2 px-4 py-2 ml-4 bg-red-500 text-white rounded hover:bg-red-600">
                    Close
                </button>
            </div>
        </div>
    )
};