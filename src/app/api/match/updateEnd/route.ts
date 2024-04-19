import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req: NextRequest)=>{

    const formData = await req.formData();
    const idMatch = formData.get("id")
    const endDateStr = formData.get("dateEnd");

    try {
        if (typeof idMatch === 'string' && typeof endDateStr === 'string') {

            const endDate = new Date(endDateStr);

            if (isNaN(endDate.getTime())) {
                throw new Error("Invalid endDate");
            }

            await db.match.update({
                where:{
                    id:idMatch,
                },
                data:{
                    dateEnd:endDate,
                    live:false,
                }
            })
        }
        
        return NextResponse.json(
            {
                message: "endDate update succesfully"
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