import { useEffect, useState } from "react";
import Bracket from "../components/bracket";
import Table from "../components/table";
import { GroupData, Match } from "@/lib/type";
import { Metadata } from "next";
import Head from "next/head";
import BracketPage from "./bracket";

export const metadata: Metadata = {
    title: "Bracket",
    description: "Bracket dan Standings Group Stage GBC UBT 2024"
}

export default function Page() {
    return (
        <>
            <BracketPage/>
        </>
    )
}