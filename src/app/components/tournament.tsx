"use client"
import { Match, Organization } from "@/lib/type";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { PopupAdmin } from "./popupadmin";
import { PopupClient } from "./popupclient";

interface TournamentProps {
    client: boolean;
}

const Tournament: React.FC<TournamentProps> = ({ client }) => {
    const options = ["Men's Doubles", "Men's Singles", "Mixed Doubles"];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Men's Doubles");
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 4, 20));
    const [dataSchedule, setDataSchedule] = useState<Match[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<Match | null>(null);

    function formatDate(date:Date) {
        const d = new Date(date),
            month = '' + (d.getMonth()),
            day = '' + d.getDate(),
            year = d.getFullYear();

        return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
    }

    const handleScheduleClick = (scheduleData:Match) => {
        setSelectedSchedule(scheduleData);
        setIsPopupVisible(true);
    };

    useEffect(() => {
        const fetchDataGroup = async () => {
            let type;
            switch (selectedOption) {
                case "Men's Singles":
                    type = "MenSingle";
                    break;
                case "Men's Doubles":
                    type = "MenDouble";
                    break;
                case "Mixed Doubles":
                    type = "MixedDouble";
                    break;
                default:
                    type = "MenDouble";
            }

            const formattedDate = formatDate(selectedDate);
            const response = await fetch(`/api/schedule/${type}/${formattedDate}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            data = data.sort((a: Match, b: Match) => {
                const dateA = a.dateStart ? new Date(a.dateStart) : new Date(0);
                const dateB = b.dateStart ? new Date(b.dateStart) : new Date(0);
            
                const timeComparison = dateA.getTime() - dateB.getTime();
                if (timeComparison !== 0) {
                    return timeComparison;
                }
        
                const courtA = a.court || 0;
                const courtB = b.court || 0;
                return courtA - courtB;
            });
            setDataSchedule(data);
        };

        fetchDataGroup().catch(console.error);
    }, [selectedOption, selectedDate]);

    return (
        <div className=" px-5 py-8 sm:px-10 sm:py-14 w-[98%] max-w-[1000px] mx-auto font-balmy text-templatePaleYellow">
            <div className=" text-lg custom:text-2xl md:text-5xl shadow-outline">
                Match Shedule 20 april - 5 May 2024
            </div>
            <button
                className="p-2 sm:p-5 mt-5 w-[130px] custom:w-[180px] md:w-[300px] ml-[1%] text-xs custom:text-xl md:text-3xl bg-templateDarkBlue hover:bg-templatePaleYellow hover:text-templateDarkBlue focus:bg-templatePaleYellow focus:text-templateDarkBlue transition duration-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption}
            </button>
            {isOpen && (
                <div className=" ml-[3%] absolute mt-1 bg-white w-[70%] rounded-md shadow-lg z-10">
                    <ul className="py-1 text-gray-700">
                        {options.map((option) => (
                        <li
                            key={option}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition duration-300"
                            onClick={() => {
                            setSelectedOption(option);
                            setIsOpen(false);
                            }}
                        >
                            {option}
                        </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className=" mt-10 bg-templateDarkBlue w-full">
                <div className=" flex justify-evenly w-full bg-templateDarkBlue cursor-pointer">
                    <div 
                        onClick={() => setSelectedDate(new Date(2024, 4, 20))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-lg md:text-2xl flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2024, 4, 20))
                            ? 'bg-templatePaleYellow text-templateDarkBlue'
                            : 'hover:bg-templatePaleYellow hover:text-templateDarkBlue'
                        }`}
                    >
                        20 Apr
                    </div>
                    <div 
                        onClick={() => setSelectedDate(new Date(2024, 4, 21))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-lg md:text-2xl flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2024, 4, 21))
                            ? 'bg-templatePaleYellow text-templateDarkBlue'
                            : 'hover:bg-templatePaleYellow hover:text-templateDarkBlue'
                        }`}
                    >
                        21 Apr
                    </div>
                    <div 
                        onClick={() => setSelectedDate(new Date(2024, 5, 4))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-lg md:text-2xl flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2024, 5, 4))
                            ? 'bg-templatePaleYellow text-templateDarkBlue'
                            : 'hover:bg-templatePaleYellow hover:text-templateDarkBlue'
                        }`}
                    >
                        4 May
                    </div>
                    <div 
                        onClick={() => setSelectedDate(new Date(2024, 5, 5))}
                        className={`h-8 custom:h-10 md:h-14 text-[10px] custom:text-lg md:text-2xl flex justify-center items-center w-full transition duration-200 ease-in ${
                            formatDate(selectedDate) === formatDate(new Date(2024, 5, 5))
                            ? 'bg-templatePaleYellow text-templateDarkBlue'
                            : 'hover:bg-templatePaleYellow hover:text-templateDarkBlue'
                        }`}
                    >
                        5 May
                    </div>
                </div>
                {
                    dataSchedule.map((match, index) => (
                        <div 
                            key={index}
                            onClick={() => handleScheduleClick(match)} 
                            className={` text-[7px] custom:text-[10px] sm:text-lg h-20 custom:h-32 sm:h-40 cursor-pointer font-monserrat font-bold ${
                                index % 2 === 0
                                ? 'bg-templateDarkBlue text-templatePaleYellow'
                                : 'bg-templatePaleYellow text-templateDarkBlue'
                            }`}
                        >
                            <div className=" flex justify-between px-[5px] pt-1 custom:px-2 custom:pt-2 sm:px-3 sm:pt-3 h-[2%] text-[6px] custom:text-[8px] sm:text-sm">
                                <div className="flex justify-center items-center">
                                    {match.dateStart ? 
                                        `Starting at ${new Date(match.dateStart).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false,timeZone:'UTC' })}` :
                                        'Start time TBA'
                                    }
                                </div>
                                <div className="flex justify-center items-center gap-1 custom:gap-2 sm:gap-3">
                                {match.live ? (
                                    <div className="inline-flex items-center text-red-500 gap-[3px] custom:gap-[7px] sm:gap-[10px]">
                                        <span className="w-[6px] h-[6px] custom:w-2 custom:h-2 sm:w-[14px] sm:h-[14px] bg-red-500 rounded-full animate-blink duration-1000"></span>
                                        Live
                                    </div>
                                ) : (() => {
                                    const startDate = match.dateStart ? new Date(match.dateStart) : null;
                                    const endDate = match.dateEnd ? new Date(match.dateEnd) : null;
                                    
                                    if (startDate && endDate && endDate > startDate) {
                                        const totalMinutes = Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60));
                                        const hours = Math.floor(totalMinutes / 60);
                                        const minutes = totalMinutes % 60;
                                        return (
                                            <div className="flex justify-center items-center gap-1 custom:gap-2 sm:gap-3">
                                                <FaClock />
                                                <span>{`${hours}:${minutes.toString().padStart(2, '0')}`}</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}
                                </div>
                            </div>
                            <div className="flex w-full h-[98%] transition-transform duration-200 ease-in-out transform hover:scale-[103%]">
                                <div className="flex flex-col flex-grow justify-center items-center w-[42%]">
                                    {/* {match.players1.split('/').map((player, playerIndex, playerArray) => ( */}
                                        <div>
                                            {match.players1}
                                        </div>
                                    {/* // ))} */}
                                    <div>
                                        {"("+(match.organization1 ? Organization[match.organization1 as keyof typeof Organization] : '')+")"}
                                    </div>
                                </div>
                                <div className="flex flex-grow flex-col items-center w-[16%]">
                                    
                                    <div className="flex justify-center items-center text-center h-[2%] text-[6px] custom:text-[8px] sm:text-sm">
                                        {match.court && <div>Court {match.court}</div>}
                                    </div>
                                    <div className="flex items-end h-[55%] font-balmy font-thin">
                                        {match.round === 'Group' ? `${match.round} ${match.group}` : match.round}
                                    </div>
                                    <div className="flex flex-col text-center text-[6px] custom:text-[8px] sm:text-sm">
                                        {match.score1.length === match.score2.length &&
                                            <>
                                                {match.score1.length > 2 ? (
                                                    <>
                                                        <div>
                                                            {match.score1.slice(0, 2).map((score, index) => `${score}-${match.score2[index]}`).join(' ')}
                                                        </div>
                                                        {match.score1.slice(2).map((score, index) => (
                                                            <div key={index + 2}>{score}-{match.score2[index + 2]}</div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <div>
                                                        {match.score1.map((score, index) => `${score}-${match.score2[index]}`).join(' ')}
                                                    </div>
                                                )}
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow justify-center items-center w-[42%]">
                                        <div>
                                            {match.players2}
                                        </div>
                                    <div>
                                        {"("+(match.organization2 ? Organization[match.organization2 as keyof typeof Organization] : '')+")"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {isPopupVisible && selectedSchedule && (
                client ? 
                    <PopupClient 
                        onClose={() => setIsPopupVisible(false)} 
                        match={selectedSchedule}
                    /> : 
                    <PopupAdmin
                        onClose={() => setIsPopupVisible(false)} 
                        match={selectedSchedule}
                    />
            )}
        </div>
    );
}

export default Tournament;