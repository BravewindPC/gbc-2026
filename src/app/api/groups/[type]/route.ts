import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Type } from '@prisma/client';

export async function GET(req:Request,{params}:{params: {type:string}}) {
  try {
      const groupType = params.type as Type;

      const group = await db.group.findMany({
          where: { type: groupType },
          include: {
              members: {
                  include: {
                      matchResult: true,
                  },
              },
          },
      });

      return NextResponse.json( group , { status: 200 });
  } catch (error) {
      console.error(error);
      return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
      );
  }
}
