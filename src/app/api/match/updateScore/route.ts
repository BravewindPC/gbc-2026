import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req: NextRequest)=>{

    const formData = await req.formData();
    const idMatch = formData.get("id")
    const scoreData = formData.get("score");
    let newscore1 : number[] = []
    let newscore2 : number[] = []
    
    if (typeof scoreData === "string") {
        const parsedScoreData : number[][] = JSON.parse(scoreData);
    
        newscore1 = parsedScoreData.map(scorePair => scorePair[0]);
        newscore2 = parsedScoreData.map(scorePair => scorePair[1]);
    }

    try {
        if (typeof idMatch === 'string') {
            await db.match.update({
                where:{
                    id:idMatch,
                },
                data:{
                    score1:newscore1,
                    score2:newscore2
                }
            })
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