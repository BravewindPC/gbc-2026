"use client"
import { useEffect, useState } from "react";
import Bracket from "../components/bracket";
import Table from "../components/table";
import { GroupData, Match } from "@/lib/type";
import { Metadata } from "next";
import Head from "next/head";

export default function BracketPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Men's Doubles");
    const [dataGroup, setDataGroup] = useState<GroupData[]>([]);
    const [dataBracket, setDataBracket] = useState<Match[]>([]);

    useEffect(() => {
        const fetchDataGroup = async () => {
            try {
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
                const response = await fetch(`/api/groups/${type}`);
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDataGroup(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        const fetchDataBracket = async () => {
            try {
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
                const response = await fetch(`/api/bracket/${type}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDataBracket(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchDataGroup();
        fetchDataBracket();
    }, [selectedOption]);

    const options = ["Men's Doubles", "Men's Singles", "Mixed Doubles"];
    return (
        <>
            <Head>
                    <title>Bracket</title>
                    <meta name="description" content="Bracket dan Standings Group Stage GBC UBT 2024" />
            </Head>
            <div className=" py-8 sm:py-14  w-full h-full font-balmy text-templatePaleYellow">
                <button
                    className="p-2 sm:p-5 w-[130px] custom:w-[180px] md:w-[300px] ml-[7%] text-xs custom:text-xl md:text-3xl bg-templateDarkBlue hover:bg-templatePaleYellow hover:text-templateDarkBlue focus:bg-templatePaleYellow focus:text-templateDarkBlue transition duration-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedOption}
                </button>
                {isOpen && (
                    <div className=" ml-[9%] absolute mt-1 bg-white w-[70%] rounded-md shadow-lg z-10">
                        <ul className="py-1 text-gray-700">
                        {options.map((option, index) => (
                                <li
                                    key={`${option}-${index}`}
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
                <div className=" mt-5 sm:mt-20 overflow-auto hide-scrollbar w-[85%] mx-auto h-[700px] sm:h-[900px] text-templateDarkBlue">
                    <div className=" flex items-center bg-templateDarkBlue min-w-[900px] h-full mx-auto overflow-x-auto hide-scrollbar">
                        <Bracket key={`bracket-${selectedOption}`} data={dataBracket}/>
                    </div>
                </div>
                {dataGroup.map((item,index) => (<div key={`group-${index}`} className=" my-5 sm:my-20 overflow-auto w-[85%] mx-auto text-templateDarkBlue">
                    <div className="p-2 text-templateDarkBlue shadow-outline-reverse-low text-xl">Group {index+1}</div>
                    <div className=" flex items-center bg-inherit mx-auto overflow-x-auto hide-scrollbar">
                        <Table
                            key={`table-${index}-${selectedOption}`}
                            type={
                                selectedOption === "Men's Singles" ? "MenSingle" :
                                selectedOption === "Men's Doubles" ? "MenDouble" :
                                selectedOption === "Mixed Doubles" ? "MixedDouble" :
                                "MenDouble"
                            }
                            data={item}
                        />
                    </div>
                </div>))}
            </div>
        </>
    );
}