import { authOptions } from "@/lib/auth";
import { Match, MatchResult, Organization } from "@/lib/type";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Socket, io } from "socket.io-client";

const url = process.env.SOCKET_URL || "https://dz4t8kjs-8080.asse.devtunnels.ms/"

export const PopupClient = ({ onClose, match }: { onClose: () => void; match: Match | null }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [score1,setScore1] = useState<number[]>([0,0]);
    const [score2,setScore2] = useState<number[]>([0,0]);
    const [score3,setScore3] = useState<number[]>([0,0]);
    const allScores = [score1, score2, score3];

    console.log(url)

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
                        <button className=" text-templatePaleYellow" onClick={onClose}>
                            <IoCloseCircle size="25px" className="cursor-pointer sm:hidden"/>
                            <IoCloseCircle size="35px" className="cursor-pointer hidden sm:inline-block"/>
                        </button>
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
                        allScores.filter(score => !(score[0] === 0 && score[1] === 0)).length > 0 ? (
                            allScores
                            .map((score, index) => (
                                <div key={index} className="mt-2 sm:mt-4 flex justify-center gap-4">
                                    <div
                                        className={`px-1 custom:px-2 text-[6px] custom:text-xs sm:text-lg ${
                                            (score[0] >= 21) && Math.abs(score[0] - score[1]) >= 2
                                            ? (score[0] > score[1] ? 'bg-templatePaleYellow text-templateDarkBlue' : '')
                                            : ''
                                        }`}
                                    >
                                        {score[0]}
                                    </div>
                                    <div className="text-[6px] custom:text-xs sm:text-lg">
                                        Game {index + 1}
                                    </div>
                                    <div
                                        className={`px-1 custom:px-2 text-[6px] custom:text-xs sm:text-lg ${
                                            (score[1] >= 21) && Math.abs(score[0] - score[1]) >= 2
                                            ? (score[1] > score[0] ? 'bg-templatePaleYellow text-templateDarkBlue' : '')
                                            : ''
                                        }`}
                                    >
                                        {score[1]}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-[8px] custom:text-xs sm:text-lg">Game has not started yet.</div>
                        )
                    }

                    {match.live && (
                        <div className="flex w-full justify-center items-center ">
                            <div className="w-[70%] text-center mt-4">
                                <div className="text-templatePaleYellow gap-[3px] custom:gap-[7px] sm:gap-[10px] text-[8px] custom:text-xs sm:text-lg px-2 py-1 bg-opacity-75 rounded">
                                This score is taken directly from the ongoing match at court {match.court} in GOR Koni
                                </div>
                            </div>
                        </div>
                    )}
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