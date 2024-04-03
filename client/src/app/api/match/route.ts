import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async()=>{
    try {
        const data = await db.match.findMany({})
        return NextResponse.json(
            data,
            { status:200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
            error:"Internal server error"
            },
            { status:500 }
        )
    }
}