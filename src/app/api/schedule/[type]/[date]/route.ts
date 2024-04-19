import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Type } from '@prisma/client';

export async function GET(req: Request, { params }: { params: { type: string, date: string } }) {
  try {
      const matchType = params.type as Type;
      const dateParam = new Date(params.date + 'T00:00:00.000Z'); // Force UTC timezone
      dateParam.setUTCHours(0, 0, 0, 0); // Set to start of day in UTC
      const startDate = new Date(dateParam);
      
      dateParam.setUTCHours(23, 59, 59, 999); // Set to end of day in UTC
      const endDate = new Date(dateParam);

      const schedule = await db.match.findMany({
        where: { 
          type: matchType,
          dateStart: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return NextResponse.json( schedule , { status: 200 });
  } catch (error) {
      console.error(error);
      return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
      );
  }
}