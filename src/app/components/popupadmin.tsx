import { authOptions } from "@/lib/auth";
import { Match, MatchResult, Organization } from "@/lib/type";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
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

    const [options, setOptions] = useState<string[]>([]);
    const [currentserve,setCurrentServe]= useState<Boolean>(false);

    useEffect(() => {
        const getOptionsFromMatch = (match: Match | null): string[] => {
            if (!match) return ["No players"];
            const players1 = match.players1 ? match.players1.split('/') : [];
            const players2 = match.players2 ? match.players2.split('/') : [];
            return [...players1, ...players2, "None"];
        };
        setOptions(match ? getOptionsFromMatch(match) : ["No match data"]);
    }, [match]);

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
        const scoresCopy = [...allScores[setIdx]];
        if (scoresCopy[playerIdx] < 30) {
            scoresCopy[playerIdx] += 1;
            const otherPlayerScore = scoresCopy[1 - playerIdx];
            const diff = Math.abs(scoresCopy[playerIdx] - otherPlayerScore);
            if (scoresCopy[playerIdx] <= 21 || diff <= 2) {
                setScoresBasedOnIndex(setIdx, scoresCopy);
                socket?.emit("update-score", { idx: setIdx, newScore: scoresCopy }, match?.id);
            }
        }
    };

    const handleDecrementScore = (setIdx: number, playerIdx: number) => {
        const scoresCopy = [...allScores[setIdx]]; // Create a copy of the specific score array
        if (scoresCopy[playerIdx] > 0) {
            scoresCopy[playerIdx] -= 1; // Decrement the specific player's score
            setScoresBasedOnIndex(setIdx, scoresCopy);
            socket?.emit("update-score", { idx: setIdx, newScore: scoresCopy }, match?.id);
        }
    };

    useEffect(() => {
        const socket = io(url);
        setSocket(socket);
        socket.emit("join-room", match?.id);


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

    const dropdownRef1 = useRef<HTMLDivElement>(null);
    const dropdownRef2 = useRef<HTMLDivElement>(null);
    const dropdownRef3 = useRef<HTMLDivElement>(null);
    const dropdownRef4 = useRef<HTMLDivElement>(null);

    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState('Not decided');

    const [dropdownVisible2, setDropdownVisible2] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState('Not decided');

    const [dropdownVisible3, setDropdownVisible3] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState('Not decided');

    const [dropdownVisible4, setDropdownVisible4] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState('Not decided');

    const [activeServe, setActiveServe] = useState<number>();

    const handleServeClick = (serveId:number) => {
        if (serveId === 1 || serveId === 2) {
            setActiveServe(serveId);
            setCurrentServe(false);
        } else if (serveId === 3 || serveId === 4) {
            setActiveServe(serveId);
            setCurrentServe(true);
        }
    };

    const handleOptionSelect1 = (option: string) => {
        setSelectedOption1(option === "None" ? "Not decided" : option);
        setDropdownVisible1(false);
    };
    
    const handleOptionSelect2 = (option: string) => {
        setSelectedOption2(option === "None" ? "Not decided" : option);
        setDropdownVisible2(false);
    };
    
    const handleOptionSelect3 = (option: string) => {
        setSelectedOption3(option === "None" ? "Not decided" : option);
        setDropdownVisible3(false);
    };
    
    const handleOptionSelect4 = (option: string) => {
        setSelectedOption4(option === "None" ? "Not decided" : option);
        setDropdownVisible4(false);
    };

    useEffect(() => {
        // Properly type the 'event' parameter as a MouseEvent
        const handleClickOutside = (event: MouseEvent) => {
            // Using 'as Node' for type assertion to satisfy the TypeScript compiler
            const target = event.target as Node;  

            if (dropdownRef1.current && !dropdownRef1.current.contains(target)) {
                setDropdownVisible1(false);
            }
            if (dropdownRef2.current && !dropdownRef2.current.contains(target)) {
                setDropdownVisible2(false);
            }
            if (dropdownRef3.current && !dropdownRef3.current.contains(target)) {
                setDropdownVisible3(false);
            }
            if (dropdownRef4.current && !dropdownRef4.current.contains(target)) {
                setDropdownVisible4(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSwapFalse = () => {
        let temp=selectedOption1;
        setSelectedOption1(selectedOption2);
        setSelectedOption2(temp);
    };

    const handleSwapTrue = () => {
        let temp=selectedOption3;
        setSelectedOption3(selectedOption4);
        setSelectedOption4(temp);
    };

    const handleSwap = () => {
        let temp=selectedOption1;
        let temp2=selectedOption2;
        setSelectedOption1(selectedOption4);
        setSelectedOption2(selectedOption3);
        setSelectedOption3(temp2);
        setSelectedOption4(temp);
    };

    return(
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-center items-center text-black font-monserrat font-bold">
            {match && 
                <div className=" flex flex-col bg-templateDarkBlue w-[80%] max-w-[800px] p-2 sm:p-3 rounded-lg text-templatePaleYellow">
                    {match.dateStart && 
                    <div className=" flex justify-between items-center text-[7px] custom:text-sm sm:text-[16px]">
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
                    <div className=" text-center mt-2 sm:mt-4 text-[8px] custom:text-xs sm:text-[16px]">
                        Court {match.court || "TBA"}
                    </div>
                    {match.live &&
                        <div className="inline-flex justify-center items-center text-red-500 gap-[3px] custom:gap-[7px] sm:gap-[10px] text-[8px] custom:text-xs sm:text-[16px]">
                            <span className="w-[6px] h-[6px] custom:w-2 custom:h-2 sm:w-[14px] sm:h-[14px] bg-red-500 rounded-full animate-blink duration-1000"></span>
                            Live
                        </div>
                    }
                    <div className="flex justify-evenly items-center mt-6 text-[10px] custom:text-xl sm:text-3xl">
                        <div className="flex flex-col flex-grow justify-center items-center w-[42%] text-[6px] custom:text-xs sm:text-[16px]">
                            {match.players1.split('/').map((player, playerIndex, playerArray) => (
                                <div key={playerIndex}>
                                    {player.trim()}{playerIndex < playerArray.length - 1 ? ' /' : ''}
                                </div>
                            ))}
                            <div>
                            {"("+(match.organization1 ? Organization[match.organization1 as keyof typeof Organization] : '')+")"}
                            </div>
                        </div>
                        <div className="font-balmy">
                            VS
                        </div>
                        <div className="flex flex-col flex-grow justify-center items-center w-[42%] text-[6px] custom:text-xs sm:text-[16px]">
                            {match.players2.split('/').map((player, playerIndex, playerArray) => (
                                <div key={playerIndex}>
                                    {player.trim()}{playerIndex < playerArray.length - 1 ? ' /' : ''}
                                </div>
                            ))}
                            <div>
                            {"("+(match.organization2 ? Organization[match.organization2 as keyof typeof Organization] : '')+")"}
                            </div>
                        </div>
                    </div>
                    
                    {gameStarted &&
                        <div className="flex justify-center">
                            <button
                                onClick={handleSwap}
                                className="mt-1 custom:mt-2 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-purple-600 text-templateWhite rounded hover:bg-purple-800 transition"
                            >
                                Swap Court
                            </button>
                        </div>
                    }
                        <div className={gameStarted ? "w-full mt-1 custom:mt-2 flex justify-center items-center gap-1" : "hidden"}>
                            <button
                                onClick={handleSwapFalse}
                                className="mt-1 -rotate-90 custom:mt-2 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-[10px] sm:text-[16px] bg-purple-600 text-templateWhite rounded hover:bg-purple-800 transition"
                            >
                                Swap
                            </button>
                            <div className="flex justify-between border-[2px] border-white w-[80%] h-[100px] sm:h-[150px] bg-white">
                                <div className="w-[49.5%] flex flex-col justify-between bg-white">
                                    <div ref={dropdownRef1}className="flex justify-center items-center h-[47px] sm:h-[72px] bg-white text-white font-normal">
                                        <div onClick={() => setDropdownVisible1(!dropdownVisible1)} className={`flex-grow flex justify-center items-center w-[80%] h-full ${activeServe === 1 ? 'bg-cyan-700' : 'bg-emerald-500'}`}>
                                            <div className="text-[8px] custom:text-xs sm:text-base cursor-pointer">{selectedOption1}</div>
                                        </div>
                                        <div onClick={() => handleServeClick(1)} className="flex-grow w-[20%] h-full bg-emerald-300 flex items-center justify-center">
                                            <div className="transform rotate-90 origin-center text-white font-bold cursor-pointer text-[8px] custom:text-xs sm:text-base">
                                                Serve
                                            </div>
                                        </div>
                                        {dropdownVisible1 && (
                                            <div className="absolute mt-8 bg-white border border-gray-200">
                                                {options.map((option, index) => (
                                                    <div key={index} className="cursor-pointer py-1 custom:py-2 px-2 custom:px-4 hover:bg-gray-100 text-black text-xs custom:text-base" onClick={() => handleOptionSelect1(option)}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div ref={dropdownRef2} className="flex justify-center items-center h-[47px] sm:h-[72px] bg-white text-white font-normal">
                                        <div onClick={() => setDropdownVisible2(!dropdownVisible2)} className={`flex-grow flex justify-center items-center w-[80%] h-full ${activeServe === 2 ? 'bg-cyan-700' : 'bg-emerald-500'}`}>
                                            <div className="text-[8px] custom:text-xs sm:text-base cursor-pointer">{selectedOption2}</div>
                                        </div>
                                        <div onClick={() => handleServeClick(2)} className="flex-grow w-[20%] h-full bg-emerald-300 flex items-center justify-center">
                                            <div className="transform rotate-90 origin-center text-white font-bold cursor-pointer text-[8px] custom:text-xs sm:text-base">
                                                Serve
                                            </div>
                                        </div>
                                        {dropdownVisible2 && (
                                            <div className="absolute mt-8 bg-white border border-gray-200">
                                                {options.map((option, index) => (
                                                    <div key={index} className="cursor-pointer py-1 custom:py-2 px-2 custom:px-4 hover:bg-gray-100 text-black text-xs custom:text-base" onClick={() => handleOptionSelect2(option)}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-[49.5%] flex flex-col justify-between bg-white">
                                <div ref={dropdownRef3} className="flex justify-center items-center h-[47px] sm:h-[72px] bg-white text-white font-normal">
                                        <div onClick={() => handleServeClick(3)} className="flex-grow w-[20%] h-full bg-emerald-300 flex items-center justify-center">
                                            <div className="transform rotate-90 origin-center text-white font-bold cursor-pointer text-[8px] custom:text-xs sm:text-base">
                                                Serve
                                            </div>
                                        </div>
                                        <div onClick={() => setDropdownVisible3(!dropdownVisible3)} className={`flex-grow flex justify-center items-center w-[80%] h-full ${activeServe === 3 ? 'bg-cyan-700' : 'bg-emerald-500'}`}>
                                            <div className="text-[8px] custom:text-xs sm:text-base cursor-pointer">{selectedOption3}</div>
                                        </div>
                                        {dropdownVisible3 && (
                                            <div className="absolute mt-8 bg-white border border-gray-200">
                                                {options.map((option, index) => (
                                                    <div key={index} className="cursor-pointer py-1 custom:py-2 px-2 custom:px-4 hover:bg-gray-100 text-black text-xs custom:text-base" onClick={() => handleOptionSelect3(option)}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div ref={dropdownRef4} className="flex justify-center items-center h-[47px] sm:h-[72px] bg-white text-white font-normal">
                                        <div onClick={() => handleServeClick(4)} className="flex-grow w-[20%] h-full bg-emerald-300 flex items-center justify-center">
                                            <div className="transform rotate-90 origin-center text-white font-bold cursor-pointer text-[8px] custom:text-xs sm:text-base">
                                                Serve
                                            </div>
                                        </div>
                                        <div onClick={() => setDropdownVisible4(!dropdownVisible4)} className={`flex-grow flex justify-center items-center w-[80%] h-full ${activeServe === 4 ? 'bg-cyan-700' : 'bg-emerald-500'}`}>
                                            <div className="text-[8px] custom:text-xs sm:text-base cursor-pointer">{selectedOption4}</div>
                                        </div>
                                        {dropdownVisible4 && (
                                            <div className="absolute mt-8 bg-white border border-gray-200">
                                                {options.map((option, index) => (
                                                    <div key={index} className="cursor-pointer py-1 custom:py-2 px-2 custom:px-4 hover:bg-gray-100 text-black text-xs custom:text-base" onClick={() => handleOptionSelect4(option)}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleSwapTrue}
                                className="mt-1 rotate-90 custom:mt-2 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-[10px] sm:text-[16px] bg-purple-600 text-templateWhite rounded hover:bg-purple-800 transition"
                            >
                                Swap
                            </button>
                        </div>

                    <div className=" "></div>
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
                                        className={`px-1 custom:px-2 mx-2 text-[6px] custom:text-xs sm:text-[16px] ${
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

                                <div className="text-[6px] custom:text-xs sm:text-[16px]">
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
                                        className={`px-1 custom:px-2 mx-2 text-[6px] custom:text-xs sm:text-[16px] ${
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
                    

                    <div className=" flex flex-col items-center">
                    {gameStarted && (
                        <div className="flex flex-col">
                            {/* <div>
                                <span className="text-templatePaleYellow text-[6px] custom:text-xs sm:text-[16px] mr-1 custom:mr-2">Winner:</span>
                                <select
                                onChange={(e) => {
                                    const value = e.target.value as Organization;
                                    handleSetWinner(value);
                                }}
                                className="p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-blue-500 text-templateWhite rounded hover:bg-blue-700 transition"
                                defaultValue=""
                                >
                                <option value="" disabled>Select winner</option>
                                {match.organization1 && (
                                    <option value={match.organization1}>{"("+(match.organization1 ? Organization[match.organization1 as keyof typeof Organization] : '')+")"}</option>
                                )}
                                {match.organization2 && (
                                    <option value={match.organization2}>{"("+(match.organization2 ? Organization[match.organization2 as keyof typeof Organization] : '')+")"}</option>
                                )}
                                </select>
                            </div> */}
                            {/* <div className="flex justify-center gap-2">
                                <button
                                onClick={handleSaveScore}
                                className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-blue-500 text-templateWhite rounded hover:bg-blue-700 transition"
                                >
                                Save score
                                </button>
                            </div> */}
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={handleStartClock}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-green-500 text-templateWhite rounded hover:bg-green-700 transition"
                                >
                                    Start Clock
                                </button>
                                <button
                                    onClick={handleStopClock}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-red-500 text-templateWhite rounded hover:bg-red-700 transition"
                                >
                                    Stop Clock
                                </button>
                            </div>
                        </div>
                    )}

                        {!gameStarted ? (
                            <button
                                onClick={handleStartGame}
                                className="mt-2 sm:mt-4 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-green-500 text-templateWhite rounded hover:bg-green-700 transition"
                            >
                                Start Game
                            </button>
                        ) : (
                            <div className="flex gap-4">
                                {/* <button
                                    onClick={handleSubmit}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-green-500 text-templateWhite rounded hover:bg-green-700 transition"
                                >
                                    Submit
                                </button> */}
                                <button
                                    onClick={handleSaveScore}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-blue-500 text-templateWhite rounded hover:bg-blue-700 transition"
                                >
                                    Save score
                                </button>
                                <button
                                    onClick={handleStopGame}
                                    className="mt-4 sm:mt-6 p-[4px] custom:p-2 sm:p-3 text-[6px] custom:text-xs sm:text-[16px] bg-red-500 text-templateWhite rounded hover:bg-red-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        
                    </div>
                    <div className="mb-4 sm:mb-8"></div>
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