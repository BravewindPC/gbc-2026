import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Type } from '@prisma/client';

export async function GET(req:Request,{params}:{params: {type:string}}) {
  try {
      const matchType = params.type as Type;

      const match = await db.match.findMany({
        where: { 
            type: matchType ,
            round:{
                not:"Group"
            }
        }
      });

      return NextResponse.json( match , { status: 200 });
  } catch (error) {
      console.error(error);
      return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
      );
  }
}
