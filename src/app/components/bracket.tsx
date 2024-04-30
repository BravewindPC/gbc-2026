import { Match, Organization, Round } from "@/lib/type";
import { useEffect, useState } from "react";

interface BracketProps {
    data: Match[];
}

const Bracket: React.FC<BracketProps> = ({ data }) => {
    const [quarterfinals, setQuarterfinals] = useState<Match[]>([]);
    const [semifinals, setSemifinals] = useState<Match[]>([]);
    const [finals, setFinals] = useState<Match[]>([]);

    useEffect(() => {
        const quarterfinalMatches = data.filter(match => match.round === Round.QuarterFinal).sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
        const semifinalMatches = data.filter(match => match.round === Round.SemiFinal).sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
        const finalMatches = data.filter(match => match.round === Round.Final).sort((a, b) => (a.number ?? 0) - (b.number ?? 0));

        setQuarterfinals(quarterfinalMatches);
        setSemifinals(semifinalMatches);
        setFinals(finalMatches);
    }, [data]);

    console.log(quarterfinals,semifinals,finals)
    
    return (
        <div className=" ml-10 mr-10 flex h-[600px] justify-center">
            <div className="flex flex-row-reverse">
                <div className=" relative ml-[50px] flex items-center after:absolute after:w-[50px] after:h-[2px] after:left-0 after:top-[50%] after:bg-templatePaleYellow after:translate-x-[-100%]">
                    <div className=" flex items-center w-[200px] h-[25px] sm:w-[400px] sm:h-[50px] m-0 bg-templatePaleYellow">Winner</div>
                </div>
                <div className="flex flex-row-reverse">
                    <div className=" relative ml-[50px] flex items-center after:absolute after:w-[25px] after:h-[2px] after:left-0 after:top-[50%] after:bg-templatePaleYellow after:translate-x-[-100%]">
                        <div className=" flex flex-col w-[200px] h-[50px] sm:w-[400px] sm:h-[100px] m-0 bg-templatePaleYellow">
                            {/* Match 7 */}
                            <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                    {(() => {
                                        const match = quarterfinals.find(match => match.number === 7);
                                        if (match && match.organization1) {
                                            return Organization[match.organization1 as keyof typeof Organization];
                                        } else {
                                            return "N/A";
                                        }
                                    })()}
                                </div>
                                {(() => {
                                    const match = quarterfinals.find(match => match.number === 7);
                                    if (match?.score1 && match.score1.length > 0) {
                                        return (
                                            <>
                                                {match.score1.length >= 1 && (
                                                    <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                        {match.score1[0] ?? 0}
                                                    </div>
                                                )}
                                                {match.score1.length >= 2 && (
                                                    <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                        {match.score1[1] ?? 0}
                                                    </div>
                                                )}
                                                {match.score1.length >= 3 && (
                                                    <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                        {match.score1[2] ?? 0}
                                                    </div>
                                                )}
                                            </>
                                        );
                                
                                    } else {
                                        return null;
                                    }
                                })()}
                            </div>
                            <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                    {(() => {
                                        const match = quarterfinals.find(match => match.number === 7);
                                        if (match && match.organization2) {
                                            return Organization[match.organization2 as keyof typeof Organization];
                                        } else {
                                            return "N/A";
                                        }
                                    })()}
                                </div>
                                {(() => {
                                    const match = quarterfinals.find(match => match.number === 7);
                                    if (match?.score2 && match.score2.length > 0) {
                                        return (
                                            <>
                                                {match.score2.length >= 1 && (
                                                    <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                        {match.score2[0] ?? 0}
                                                    </div>
                                                )}
                                                {match.score2.length >= 2 && (
                                                    <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                        {match.score2[1] ?? 0}
                                                    </div>
                                                )}
                                                {match.score2.length >= 3 && (
                                                    <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                        {match.score2[2] ?? 0}
                                                    </div>
                                                )}
                                            </>
                                        );
                                
                                    } else {
                                        return null;
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-start justify-end my-[10px] relative before:absolute before:bg-templatePaleYellow before:right-0 before:top-[50%] before:translate-x-[100%] before:w-[25px] before:h-[2px] after:absolute after:bg-templatePaleYellow after:right-[-25px] after:w-[2px] after:top-[50%] item-child last:after:translate-y-[-100%] only:after:hidden">
                            <div className="flex flex-row-reverse">
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-start justify-end my-[10px] relative before:absolute before:bg-templatePaleYellow before:right-0 before:top-[50%] before:translate-x-[100%] before:w-[25px] before:h-[2px] after:absolute after:bg-templatePaleYellow after:right-[-25px] after:w-[2px] after:top-[50%] item-child last:after:translate-y-[-100%] only:after:hidden">
                                        <div className="flex flex-row-reverse">
                                            <div className="relative ml-[50px] flex items-center after:absolute after:w-[25px] after:h-[2px] after:left-0 after:top-[50%] after:bg-templatePaleYellow after:translate-x-[-100%]">
                                                <div className=" flex flex-col w-[200px] h-[50px] sm:w-[400px] sm:h-[100px] m-0 bg-templatePaleYellow">
                                                    {/* Match 5 */}
                                                    <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                        <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 5);
                                                                if (match && match.organization1) {
                                                                    return Organization[match.organization1 as keyof typeof Organization];
                                                                } else {
                                                                    return "N/A";
                                                                }
                                                            })()}
                                                        </div>
                                                        {(() => {
                                                            const match = quarterfinals.find(match => match.number === 5);
                                                            if (match?.score1 && match.score1.length > 0) {
                                                                return (
                                                                    <>
                                                                        {match.score1.length >= 1 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score1[0] ?? 0}
                                                                            </div>
                                                                        )}
                                                                        {match.score1.length >= 2 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score1[1] ?? 0}
                                                                            </div>
                                                                        )}
                                                                        {match.score1.length >= 3 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score1[2] ?? 0}
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                        
                                                            } else {
                                                                return null;
                                                            }
                                                        })()}
                                                    </div>
                                                    <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                        <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 5);
                                                                if (match && match.organization2) {
                                                                    return Organization[match.organization2 as keyof typeof Organization];
                                                                } else {
                                                                    return "N/A";
                                                                }
                                                            })()}
                                                        </div>
                                                        {(() => {
                                                            const match = quarterfinals.find(match => match.number === 5);
                                                            if (match?.score2 && match.score2.length > 0) {
                                                                return (
                                                                    <>
                                                                        {match.score2.length >= 1 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score2[0] ?? 0}
                                                                            </div>
                                                                        )}
                                                                        {match.score2.length >= 2 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score2[1] ?? 0}
                                                                            </div>
                                                                        )}
                                                                        {match.score2.length >= 3 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score2[2] ?? 0}
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                        
                                                            } else {
                                                                return null;
                                                            }
                                                        })()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-28 flex-col justify-center">
                                                <div className="flex items-start justify-end my-[10px] relative before:absolute before:bg-templatePaleYellow before:right-0 before:top-[50%] before:translate-x-[100%] before:w-[25px] before:h-[2px] after:absolute after:bg-templatePaleYellow after:right-[-25px] after:w-[2px] after:top-[50%] item-child last:after:translate-y-[-100%] only:after:hidden">
                                                    <div className=" flex flex-col w-[200px] h-[50px] sm:w-[400px] sm:h-[100px] m-0 bg-templatePaleYellow">
                                                        {/* Match 1 */}
                                                        <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                            <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                                {(() => {
                                                                    const match = quarterfinals.find(match => match.number === 1);
                                                                    if (match && match.organization1) {
                                                                        return Organization[match.organization1 as keyof typeof Organization];
                                                                    } else {
                                                                        return "N/A";
                                                                    }
                                                                })()}
                                                            </div>
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 1);
                                                                if (match?.score1 && match.score1.length > 0) {
                                                                    return (
                                                                        <>
                                                                            {match.score1.length >= 1 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[0] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score1.length >= 2 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[1] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score1.length >= 3 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[2] ?? 0}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    );
                                                            
                                                                } else {
                                                                    return null;
                                                                }
                                                            })()}
                                                        </div>
                                                        <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                            <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                                {(() => {
                                                                    const match = quarterfinals.find(match => match.number === 1);
                                                                    if (match && match.organization2) {
                                                                        return Organization[match.organization2 as keyof typeof Organization];
                                                                    } else {
                                                                        return "N/A";
                                                                    }
                                                                })()}
                                                            </div>
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 1);
                                                                if (match?.score2 && match.score2.length > 0) {
                                                                    return (
                                                                        <>
                                                                            {match.score2.length >= 1 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[0] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score2.length >= 2 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[1] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score2.length >= 3 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[2] ?? 0}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    );
                                                            
                                                                } else {
                                                                    return null;
                                                                }
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-end my-[10px] relative before:absolute before:bg-templatePaleYellow before:right-0 before:top-[50%] before:translate-x-[100%] before:w-[25px] before:h-[2px] after:absolute after:bg-templatePaleYellow after:right-[-25px] after:w-[2px] after:top-[50%] item-child last:after:translate-y-[-100%] only:after:hidden">
                                                    <div className=" flex flex-col w-[200px] h-[50px] sm:w-[400px] sm:h-[100px] m-0 bg-templatePaleYellow">
                                                        {/* Match 2 */}
                                                        <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                            <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                                {(() => {
                                                                    const match = quarterfinals.find(match => match.number === 2);
                                                                    if (match && match.organization1) {
                                                                        return Organization[match.organization1 as keyof typeof Organization];
                                                                    } else {
                                                                        return "N/A";
                                                                    }
                                                                })()}
                                                            </div>
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 2);
                                                                if (match?.score1 && match.score1.length > 0) {
                                                                    return (
                                                                        <>
                                                                            {match.score1.length >= 1 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[0] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score1.length >= 2 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[1] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score1.length >= 3 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[2] ?? 0}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    );
                                                            
                                                                } else {
                                                                    return null;
                                                                }
                                                            })()}
                                                        </div>
                                                        <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                            <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                                {(() => {
                                                                    const match = quarterfinals.find(match => match.number === 2);
                                                                    if (match && match.organization2) {
                                                                        return Organization[match.organization2 as keyof typeof Organization];
                                                                    } else {
                                                                        return "N/A";
                                                                    }
                                                                })()}
                                                            </div>
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 2);
                                                                if (match?.score2 && match.score2.length > 0) {
                                                                    return (
                                                                        <>
                                                                            {match.score2.length >= 1 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[0] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score2.length >= 2 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[1] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score2.length >= 3 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[2] ?? 0}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    );
                                                            
                                                                } else {
                                                                    return null;
                                                                }
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start justify-end my-[10px] relative before:absolute before:bg-templatePaleYellow before:right-0 before:top-[50%] before:translate-x-[100%] before:w-[25px] before:h-[2px] after:absolute after:bg-templatePaleYellow after:right-[-25px] after:w-[2px] after:top-[50%] item-child last:after:translate-y-[-100%] only:after:hidden">
                            <div className="flex flex-row-reverse">
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-start justify-end my-[10px] relative before:absolute before:bg-templatePaleYellow before:right-0 before:top-[50%] before:translate-x-[100%] before:w-[25px] before:h-[2px] after:absolute after:bg-templatePaleYellow after:right-[-25px] after:w-[2px] after:top-[50%] item-child last:after:translate-y-[-100%] only:after:hidden">
                                        <div className="flex flex-row-reverse">
                                            <div className="relative ml-[50px] flex items-center after:absolute after:w-[25px] after:h-[2px] after:left-0 after:top-[50%] after:bg-templatePaleYellow after:translate-x-[-100%]">
                                                <div className=" flex flex-col w-[200px] h-[50px] sm:w-[400px] sm:h-[100px] m-0 bg-templatePaleYellow">
                                                    {/* Match 6 */}
                                                    <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                        <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 6);
                                                                if (match && match.organization1) {
                                                                    return Organization[match.organization1 as keyof typeof Organization];
                                                                } else {
                                                                    return "N/A";
                                                                }
                                                            })()}
                                                        </div>
                                                        {(() => {
                                                            const match = quarterfinals.find(match => match.number === 6);
                                                            if (match?.score1 && match.score1.length > 0) {
                                                                return (
                                                                    <>
                                                                        {match.score1.length >= 1 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score1[0] ?? 0}
                                                                            </div>
                                                                        )}
                                                                        {match.score1.length >= 2 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score1[1] ?? 0}
                                                                            </div>
                                                                        )}
                                                                        {match.score1.length >= 3 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score1[2] ?? 0}
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                        
                                                            } else {
                                                                return null;
                                                            }
                                                        })()}
                                                    </div>
                                                    <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                        <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 6);
                                                                if (match && match.organization2) {
                                                                    return Organization[match.organization2 as keyof typeof Organization];
                                                                } else {
                                                                    return "N/A";
                                                                }
                                                            })()}
                                                        </div>
                                                        {(() => {
                                                            const match = quarterfinals.find(match => match.number === 6);
                                                            if (match?.score2 && match.score2.length > 0) {
                                                                return (
                                                                    <>
                                                                        {match.score2.length >= 1 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score2[0] ?? 0}
                                                                            </div>
                                                                        )}
                                                                        {match.score2.length >= 2 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score2[1] ?? 0}
                                                                            </div>
                                                                        )}
                                                                        {match.score2.length >= 3 && (
                                                                            <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                {match.score2[2] ?? 0}
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                        
                                                            } else {
                                                                return null;
                                                            }
                                                        })()}
                                                    </div>
                                                </div>
                                                </div>
                                            <div className="flex gap-28 flex-col justify-center">
                                                <div className="flex items-start justify-end my-[10px] relative before:absolute before:bg-templatePaleYellow before:right-0 before:top-[50%] before:translate-x-[100%] before:w-[25px] before:h-[2px] after:absolute after:bg-templatePaleYellow after:right-[-25px] after:w-[2px] after:top-[50%] item-child last:after:translate-y-[-100%] only:after:hidden">
                                                <div className=" flex flex-col w-[200px] h-[50px] sm:w-[400px] sm:h-[100px] m-0 bg-templatePaleYellow">
                                                        {/* Match 3 */}
                                                        <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                            <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                                {(() => {
                                                                    const match = quarterfinals.find(match => match.number === 3);
                                                                    if (match && match.organization1) {
                                                                        return Organization[match.organization1 as keyof typeof Organization];
                                                                    } else {
                                                                        return "N/A";
                                                                    }
                                                                })()}
                                                            </div>
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 3);
                                                                if (match?.score1 && match.score1.length > 0) {
                                                                    return (
                                                                        <>
                                                                            {match.score1.length >= 1 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[0] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score1.length >= 2 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[1] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score1.length >= 3 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[2] ?? 0}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    );
                                                            
                                                                } else {
                                                                    return null;
                                                                }
                                                            })()}
                                                        </div>
                                                        <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                            <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                                {(() => {
                                                                    const match = quarterfinals.find(match => match.number === 3);
                                                                    if (match && match.organization2) {
                                                                        return Organization[match.organization2 as keyof typeof Organization];
                                                                    } else {
                                                                        return "N/A";
                                                                    }
                                                                })()}
                                                            </div>
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 3);
                                                                if (match?.score2 && match.score2.length > 0) {
                                                                    return (
                                                                        <>
                                                                            {match.score2.length >= 1 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[0] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score2.length >= 2 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[1] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score2.length >= 3 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[2] ?? 0}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    );
                                                            
                                                                } else {
                                                                    return null;
                                                                }
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-end my-[10px] relative before:absolute before:bg-templatePaleYellow before:right-0 before:top-[50%] before:translate-x-[100%] before:w-[25px] before:h-[2px] after:absolute after:bg-templatePaleYellow after:right-[-25px] after:w-[2px] after:top-[50%] item-child last:after:translate-y-[-100%] only:after:hidden">
                                                <div className=" flex flex-col w-[200px] h-[50px] sm:w-[400px] sm:h-[100px] m-0 bg-templatePaleYellow">
                                                        {/* Match 4 */}
                                                        <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                            <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                                {(() => {
                                                                    const match = quarterfinals.find(match => match.number === 4);
                                                                    if (match && match.organization1) {
                                                                        return Organization[match.organization1 as keyof typeof Organization];
                                                                    } else {
                                                                        return "N/A";
                                                                    }
                                                                })()}
                                                            </div>
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 4);
                                                                if (match?.score1 && match.score1.length > 0) {
                                                                    return (
                                                                        <>
                                                                            {match.score1.length >= 1 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[0] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score1.length >= 2 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[1] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score1.length >= 3 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score1[2] ?? 0}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    );
                                                            
                                                                } else {
                                                                    return null;
                                                                }
                                                            })()}
                                                        </div>
                                                        <div className="flex justify-center items-center h-[25px] sm:h-[50px]">
                                                            <div className=" w-full h-full border-b-2 border-templateDarkBlue flex items-center">
                                                                {(() => {
                                                                    const match = quarterfinals.find(match => match.number === 4);
                                                                    if (match && match.organization2) {
                                                                        return Organization[match.organization2 as keyof typeof Organization];
                                                                    } else {
                                                                        return "N/A";
                                                                    }
                                                                })()}
                                                            </div>
                                                            {(() => {
                                                                const match = quarterfinals.find(match => match.number === 4);
                                                                if (match?.score2 && match.score2.length > 0) {
                                                                    return (
                                                                        <>
                                                                            {match.score2.length >= 1 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[0] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score2.length >= 2 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[1] ?? 0}
                                                                                </div>
                                                                            )}
                                                                            {match.score2.length >= 3 && (
                                                                                <div className="text-center border-l-2 border-b-2 border-templateDarkBlue h-full w-[60px] p-1 sm:p-2">
                                                                                    {match.score2[2] ?? 0}
                                                                                </div>
                                                                            )}
                                                                        </>
                                                                    );
                                                            
                                                                } else {
                                                                    return null;
                                                                }
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bracket;