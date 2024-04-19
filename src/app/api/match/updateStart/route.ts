import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req: NextRequest)=>{

    const formData = await req.formData();
    const idMatch = formData.get("id")
    const startDateStr = formData.get("dateStart");

    try {
        if (typeof idMatch === 'string' && typeof startDateStr === 'string') {

            const startDate = new Date(startDateStr);

            if (isNaN(startDate.getTime())) {
                throw new Error("Invalid startDate");
            }

            await db.match.update({
                where:{
                    id:idMatch,
                },
                data:{
                    dateStart:startDate,
                    live:true,
                }
            })
        }
        
        return NextResponse.json(
            {
                message: "startDate update succesfully"
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