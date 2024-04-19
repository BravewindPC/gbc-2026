import { authOptions } from "@/lib/auth";
import { Match, MatchResult, Organization } from "@/lib/type";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Socket, io } from "socket.io-client";

const url = process.env.SOCKET_URL || "wss://dz4t8kjs-8080.asse.devtunnels.ms/"

export const PopupAdmin = ({ onClose, match }: { onClose: () => void; match: Match | null }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [score1,setScore1] = useState<number[]>([0,0]);
    const [score2,setScore2] = useState<number[]>([0,0]);
    const [score3,setScore3] = useState<number[]>([0,0]);
    const allScores = [score1, score2, score3];
    const [winner,handleSetWinner] = useState<Organization>();
    const [gameStarted, setGameStarted] = useState(false);

    const setScoresBasedOnIndex = (index: number, scores: number[]) => {
        switch(index) {
            case 0:
                setScore1(scores);
                break;
            case 1:
                setScore2(scores);
                break;
            case 2:
                setScore3(scores);
                break;
            default:
                console.log("Invalid index");
        }
    };

    const handleIncrementScore = (setIdx: number, playerIdx: number) => {
        const updatedScores = [...allScores];
        const newScore = updatedScores[setIdx][playerIdx] + 1;
        const otherPlayerScore = updatedScores[setIdx][1 - playerIdx];
        const diff = Math.abs(newScore - otherPlayerScore);
    
        if (newScore <= 30 && (newScore <= 21 || diff <= 2)) {
            updatedScores[setIdx][playerIdx] += 1;
            setScoresBasedOnIndex(setIdx, updatedScores[setIdx]);
            socket?.emit("update-score", { idx: setIdx, newScore: updatedScores[setIdx] }, match?.id);
        }
    };

    const handleDecrementScore = (setIdx: number, playerIdx: number) => {
        const updatedScores = [...allScores];
        if (updatedScores[setIdx][playerIdx] > 0) {
            updatedScores[setIdx][playerIdx] -= 1;
            setScoresBasedOnIndex(setIdx, updatedScores[setIdx]);
            socket?.emit("update-score", { idx: setIdx, newScore: updatedScores[setIdx] }, match?.id);
        }
    };

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


    const handleSubmit = async () => {
        const formData =  new FormData()
        if (match && match.id) {
            formData.append('id', match.id);
        }

        const scoreData = [score1, score2, score3].filter(score => !(score[0] === 0 && score[1] === 0));

        scoreData.forEach(score => {
            const score1 = score[0];
            const score2 = score[1];
            const diff = Math.abs(score1 - score2);
            if ((score1 < 21 && score2 < 21) || diff < 2) {
                console.log(score1,score2)
                toast.error('Invalid score detected');
                return;
            }
        });

        if (scoreData.length === 0) {
            toast.error('No score data found');
            return;
        }

        formData.append('score',JSON.stringify(scoreData))
        if (winner !== undefined) {
            formData.append('winner', winner);
        } else {
            toast.error('Winner not decided yet');
            return;
        }

        if (match?.group !== null && match?.group !== undefined) {
            formData.append('group', match.group.toString());
        }

        if (match?.organization1 !== null && match?.organization1 !== undefined) {
            formData.append('organization1', match.organization1.toString());
        }

        if (match?.organization2 !== null && match?.organization2 !== undefined) {
            formData.append('organization2', match.organization2.toString());
        }

        if (match?.round !== null && match?.round !== undefined) {
            formData.append('round', match.round.toString());
        }

        if (match?.type !== null && match?.type !== undefined) {
            formData.append('type', match.type.toString());
        }

        try {
            const response = await fetch('/api/match/setWinner', {
                method: 'PUT',
                body: formData,
            });
    
            if (response.ok) {
                toast.success('Data submitted succesfully');
            } else {
                toast.error('Failed to submit data');
            }

            setGameStarted(false);
        } catch (error) {
            toast.error('Error submitting data');
        }
    }

    const handleSaveScore = async () => {
        const formData =  new FormData()

        if (match && match.id) {
            formData.append('id', match.id);
        }

        const scoreData = [score1, score2, score3].filter(score => !(score[0] === 0 && score[1] === 0));

        if (scoreData.length === 0) {
            toast.error('No score data found');
            return;
        }

        formData.append('score',JSON.stringify(scoreData))

        try {
            const response = await fetch('/api/match/updateScore', {
                method: 'PUT',
                body: formData,
            });
    
            if (response.ok) {
                toast.success('Score saved succesfully');
            } else {
                toast.error('Failed to update scores');
            }
        } catch (error) {
            toast.error('Error updating scores');
        }
    }

    const handleStartGame = () => {
        setGameStarted(true);
    };

    const handleStopGame = () => {
        setGameStarted(false);
    };

    const handleStartClock = async () => {
        const formData =  new FormData();

        if (match && match.id) {
            formData.append('id', match.id);
        }

        const dateStart = new Date();
        dateStart.setHours(dateStart.getHours() + 7);
        formData.append('dateStart', dateStart.toISOString());
        try {
            const response = await fetch('/api/match/updateStart', {
                method: 'PUT',
                body: formData,
            });
    
            if (response.ok) {
                toast.success('Clock Started succesfully',{

                })
            } else {
                toast.error('Failed to start the game clock');
            }
        } catch (error) {
            toast.error('Error starting the game clock');
        }
    };

    const handleStopClock = async () => {
        const formData =  new FormData();

        if (match && match.id) {
            formData.append('id', match.id);
        }

        const dateEnd = new Date();
        dateEnd.setHours(dateEnd.getHours() + 7);
        formData.append('dateEnd', dateEnd.toISOString());
        try {
            const response = await fetch('/api/match/updateEnd', {
                method: 'PUT',
                body: formData,
            });
    
            if (response.ok) {
                toast.success('Clock stopped succesfully',{

                })
            } else {
                toast.error('Failed to stop the game clock');
            }
        } catch (error) {
            toast.error('Error stopping the game clock');
        }
    };

    return(
        <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center text-black font-monserrat font-bold">
            {match && 
                <div className=" flex flex-col bg-templateDarkBlue w-[80%] max-w-[800px] p-2 sm:p-5 rounded-lg text-templatePaleYellow">
                    {match.dateStart && 
                    <div className=" flex justify-between items-center text-[7px] custom:text-sm sm:text-lg">
                        {
                            (() => {
                            const date = new Date(match.dateStart);
                            date.setHours(date.getHours() - 7);

                            const day = date.getDate();
                            const month = date.getMonth() + 1;
                            const year = date.getFullYear();
                            let hours = date.getHours();
                            const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure minutes are two digits

                            return (
                                <>
                                {`${day} / ${month} / ${year}`}
                                <br />
                                {`${hours}:${minutes}`}
                                </>
                            );
                            })()
                        }
                        {!gameStarted &&
                        <button className=" text-templatePaleYellow" onClick={onClose}>
                            <IoCloseCircle size="25px" className="cursor-pointer sm:hidden"/>
                            <IoCloseCircle size="35px" className="cursor-pointer hidden sm:inline-block"/>
                        </button>
                        }
                    </div>}
                    <div className=" text-center mt-2 sm:mt-4 text-[8px] custom:text-xs sm:text-lg">
                        Court {match.court || "TBA"}
                    </div>
                    {match.live &&
                        <div className="inline-flex justify-center items-center text-red-500 gap-[3px] custom:gap-[7px] sm:gap-[10px] text-[8px] custom:text-xs sm:text-lg">
                            <span className="w-[6px] h-[6px] custom:w-2 custom:h-2 sm:w-[14px] sm:h-[14px] bg-red-500 rounded-full animate-blink duration-1000"></span>
                            Live
                        </div>
                    }
                    <div className="flex justify-evenly items-center mt-6 text-[10px] custom:text-xl sm:text-3xl">
                        <div className="flex flex-col flex-grow justify-center items-center w-[42%] text-[6px] custom:text-xs sm:text-lg">
                            {match.players1.split('/').map((player, playerIndex, playerArray) => (
                                <div key={playerIndex}>
                                    {player.trim()}{playerIndex < playerArray.length - 1 ? ' /' : ''}
                                </div>
                            ))}
                            <div>
                                {"("+match.organization1+")"}
                            </div>
                        </div>
                        <div className="font-balmy">
                            VS
                        </div>
                        <div className="flex flex-col flex-grow justify-center items-center w-[42%] text-[6px] custom:text-xs sm:text-lg">
                            {match.players2.split('/').map((player, playerIndex, playerArray) => (
                                <div key={playerIndex}>
                                    {player.trim()}{playerIndex < playerArray.length - 1 ? ' /' : ''}
                                </div>
                            ))}
                            <div>
                                {"("+match.organization2+")"}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-8"></div>
                    {
                        allScores.map((score, index) => (
                            <div key={index} className="mt-2 sm:mt-4 flex justify-center gap-4 items-center">
                                <div className="flex items-center">
                                    {gameStarted && 
                                        <button 
                                            onClick={() => handleDecrementScore(index, 0)} 
                                            className="px-[5px] custom:px-[10px] text-xs custom:text-lg sm:text-xl font-bold border border-templatePaleYellow bg-templatePaleYellow text-templateDarkBlue hover:bg-templateDarkBlue hover:text-templatePaleYellow rounded"
                                        >
                                            -
                                        </button>
                                    }
                                    <div
                                        className={`px-1 custom:px-2 mx-2 text-[6px] custom:text-xs sm:text-lg ${
                                            (score[0] >= 21) && Math.abs(score[0] - score[1]) >= 2
                                            ? (score[0] > score[1] ? 'bg-templatePaleYellow text-templateDarkBlue' : '')
                                            : ''
                                        }`}
                                    >
                                        {score[0]}
                                    </div>
                                    {gameStarted && 
                                        <button 
                                            onClick={() => handleIncrementScore(index, 0)} 
                                            className="px-[4px] custom:px-2 text-xs custom:text-lg sm:text-xl font-bold border border-templatePaleYellow bg-templatePaleYellow text-templateDarkBlue hover:bg-templateDarkBlue hover:text-templatePaleYellow rounded"
                                        >
                                            +
                                        </button>
                                    }
                                </div>

                                <div className="text-[6px] custom:text-xs sm:text-lg">
                                    Game {index + 1}
                                </div>

                                <div className="flex items-center">
                                    {gameStarted && 
                                        <button 
                                            onClick={() => handleDecrementScore(index, 1)} 
                                            className="px-[5px] custom:px-[10px] text-xs custom:text-lg sm:text-xl font-bold border border-templatePaleYellow bg-templatePaleYellow text-templateDarkBlue hover:bg-templateDarkBlue hover:text-templatePaleYellow rounded"
                                        >
                                            -
                                        </button>
                                    }
                                    <div
                                        className={`px-1 custom:px-2 mx-2 text-[6px] custom:text-xs sm:text-lg ${
                                            (score[1] >= 21) && Math.abs(score[0] - score[1]) >= 2
                                            ? (score[1] > score[0] ? 'bg-templatePaleYellow text-templateDarkBlue' : '')
                                            : ''
                                        }`}
                                    >
                                        {score[1]}
                                    </div>
                                    {gameStarted && 
                                        <button 
                                            onClick={() => handleIncrementScore(index, 1)} 
                                            className="px-[4px] custom:px-2 text-xs custom:text-lg sm:text-xl font-bold border border-templatePaleYellow bg-templatePaleYellow text-templateDarkBlue hover:bg-templateDarkBlue hover:text-templatePaleYellow rounded"
                                        >
                                            +
                                        </button>
                                    }
                                </div>
                            </div>
                        ))
                    }
                    <div className="mt-4 flex flex-col items-center">

                    {gameStarted && (
                        <div className="flex flex-col">
                            <div>
                                <span className="text-templatePaleYellow text-[6px] custom:text-xs sm:text-lg mr-1 custom:mr-2">Winner:</span>
                                <select
                                    onChange={(e) => {
                                        const value = e.target.value as Organization;
                                        handleSetWinner(value);
                                    }}
                                    className="p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-lg bg-blue-500 text-templateWhite rounded hover:bg-blue-700 transition"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select winner</option>
                                    {match.organization1 && (
                                        <option value={match.organization1}>{match.organization1}</option>
                                    )}
                                    {match.organization2 && (
                                        <option value={match.organization2}>{match.organization2}</option>
                                    )}
                                </select>
                            </div>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={handleSaveScore}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-lg bg-blue-500 text-templateWhite rounded hover:bg-blue-700 transition"
                                >
                                    Save score
                                </button>
                            </div>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={handleStartClock}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-lg bg-green-500 text-templateWhite rounded hover:bg-green-700 transition"
                                >
                                    Start Clock
                                </button>
                                <button
                                    onClick={handleStopClock}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-lg bg-red-500 text-templateWhite rounded hover:bg-red-700 transition"
                                >
                                    Stop Clock
                                </button>
                            </div>
                        </div>
                    )}

                        {!gameStarted ? (
                            <button
                                onClick={handleStartGame}
                                className="mt-2 sm:mt-4 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-lg bg-green-500 text-templateWhite rounded hover:bg-green-700 transition"
                            >
                                Start Game
                            </button>
                        ) : (
                            <div className="flex gap-4">
                                <button
                                    onClick={handleSubmit}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-lg bg-green-500 text-templateWhite rounded hover:bg-green-700 transition"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={handleStopGame}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-lg bg-red-500 text-templateWhite rounded hover:bg-red-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        
                    </div>
                    <div className="mb-8 sm:mb-16"></div>
                </div>
            }
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
};