import { db } from "@/lib/db";
import { Organization, Round, Type } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req: NextRequest)=>{
    const formData = await req.formData();
    const idMatch = formData.get("id")
    const scoreData = formData.get("score");
    const winner = formData.get("winner") as Organization | null;
    const groupNumber = formData.get("group") as string;
    const organization1 = formData.get("organization1") as Organization;
    const organization2 = formData.get("organization2") as Organization;
    const round = formData.get("round") as Round | null;
    const type = formData.get("type") as Type | null;

    if (winner === null || winner === undefined 
        || scoreData === null || scoreData === undefined 
        || round === null || round === undefined
        || type === null || type === undefined
        || organization1 === null || organization1 === undefined
        || organization2 === null || organization2 === undefined) {
        return NextResponse.json(
            { error: "Data not valid" },
            { status: 400 }
        );
    }

    let newscore1 : number[] = []
    let newscore2 : number[] = []
    
    if (typeof scoreData === "string") {
        const parsedScoreData : number[][] = JSON.parse(scoreData);
    
        newscore1 = parsedScoreData.map(scorePair => scorePair[0]);
        newscore2 = parsedScoreData.map(scorePair => scorePair[1]);
    }

    if (newscore1.length!=newscore2.length) {
        return NextResponse.json(
            { error: "Data not valid" },
            { status: 400 }
        );
    }

    try {
        if (typeof idMatch === 'string') {
            if (round === Round.Group && groupNumber !== null && groupNumber !== undefined) {
                const group = await db.group.findFirst({ where: { number: parseInt(groupNumber), type:type } });

                if (group) {
                    
                    const groupmember1 = await db.groupMembership.findFirst({
                        where: { 
                            groupId: group.id,
                            organization: organization1
                        }
                    });

                    const groupmember2 = await db.groupMembership.findFirst({
                        where: { 
                            groupId: group.id,
                            organization: organization2
                        }
                    });

                    if (groupmember1 && groupmember2) {
                        const matchResult1 = await db.matchResult.findFirst({
                            where: {
                                groupMembershipId: groupmember1.id
                            }
                        });

                        const matchResult2 = await db.matchResult.findFirst({
                            where: {
                                groupMembershipId: groupmember2.id
                            }
                        });


                        if (matchResult1) {
                            const updatedPlayedCount = matchResult1.played ? matchResult1.played + 1 : 1;
                            let updatedWinCount = matchResult1.win || 0;
                            let updatedLoseCount = matchResult1.lose || 0;
                            let updatedSetWinCount = matchResult1.setWin || 0;
                            let updatedSetLoseCount = matchResult1.setLose || 0;
                            let updatedScoreGain = matchResult1.scoreGain || 0;
                            let updatedScoreLose = matchResult1.scoreLose || 0;
                            let updatedPoints = matchResult1.points || 0;

                            if (organization1==winner) {
                                updatedWinCount++;
                                updatedPoints++;
                            } else {
                                updatedLoseCount++;
                            }

                            for (let i = 0; i < newscore1.length; i++) {
                                const diff = Math.abs(newscore1[i] - newscore2[i]);
                                if (newscore1[i] >= 21 && diff >= 2) {
                                    updatedSetWinCount++;
                                    updatedScoreGain += newscore1[i];
                                    updatedScoreLose += newscore2[i];
                                } else if (newscore2[i] >= 21 && diff >= 2) {
                                    updatedSetLoseCount++;
                                    updatedScoreGain += newscore1[i];
                                    updatedScoreLose += newscore2[i];
                                }
                            }

                            await db.matchResult.update({
                                where: {
                                    groupMembershipId: groupmember1.id
                                },
                                data: {
                                    played: updatedPlayedCount,
                                    win: updatedWinCount,
                                    lose: updatedLoseCount,
                                    setWin: updatedSetWinCount,
                                    setLose: updatedSetLoseCount,
                                    scoreGain: updatedScoreGain,
                                    scoreLose: updatedScoreLose,
                                    points: updatedPoints
                                }
                            });
                        }

                        if (matchResult2) {
                            const updatedPlayedCount = matchResult2.played ? matchResult2.played + 1 : 1;
                            let updatedWinCount = matchResult2.win || 0;
                            let updatedLoseCount = matchResult2.lose || 0;
                            let updatedSetWinCount = matchResult2.setWin || 0;
                            let updatedSetLoseCount = matchResult2.setLose || 0;
                            let updatedScoreGain = matchResult2.scoreGain || 0;
                            let updatedScoreLose = matchResult2.scoreLose || 0;
                            let updatedPoints = matchResult2.points || 0;

                            if (organization2==winner) {
                                updatedWinCount++;
                                updatedPoints++;
                            } else {
                                updatedLoseCount++;
                            }

                            for (let i = 0; i < newscore2.length; i++) {
                                const diff = Math.abs(newscore1[i] - newscore2[i]);
                                if (newscore2[i] >= 21 && diff >= 2) {
                                    updatedSetWinCount++;
                                    updatedScoreGain += newscore2[i];
                                    updatedScoreLose += newscore1[i];
                                } else if (newscore1[i] >= 21 && diff >= 2) {
                                    updatedSetLoseCount++;
                                    updatedScoreGain += newscore2[i];
                                    updatedScoreLose += newscore1[i];
                                }
                            }

                            await db.matchResult.update({
                                where: {
                                    groupMembershipId: groupmember2.id
                                },
                                data: {
                                    played: updatedPlayedCount,
                                    win: updatedWinCount,
                                    lose: updatedLoseCount,
                                    setWin: updatedSetWinCount,
                                    setLose: updatedSetLoseCount,
                                    scoreGain: updatedScoreGain,
                                    scoreLose: updatedScoreLose,
                                    points: updatedPoints
                                }
                            });
                        }

                        await db.match.update({
                            where: {
                                id:idMatch,
                            },
                            data: {
                                winners:winner,
                                score1:newscore1,
                                score2:newscore2
                            }
                        });

                    } else {
                        return NextResponse.json(
                            { error: "Bad Request" },
                            { status: 400 }
                        );
                    }
                } else {
                    return NextResponse.json(
                        { error: "Bad Request" },
                        { status: 400 }
                    );
                }
            } else {
                return NextResponse.json(
                    { error: "Bad Request" },
                    { status: 400 }
                );
            }
        }
        
        return NextResponse.json(
            {
                message: "Score update succesfully"
            }, 
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                error:"Internal server error"
            },
            { status: 500 }
        )
    }
}