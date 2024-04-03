"use client"
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import { Popup } from "../components/popup";
import { Match } from "@prisma/client";

export default function Page() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/match');
          if (!response.ok) {
            throw new Error('Failed to fetch');
          }
          const data: Match[] = await response.json();
          console.log(data);
          setMatches(data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      fetchData();
    }, []);

    return (
      <div className="flex flex-wrap -m-2">
        {matches
        .slice()
        .sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          
          return dateA.getTime() - dateB.getTime();
        })
        .map((match, index) => (
          <div key={match.id} className="p-4 w-1/4">
            <div className="h-40 bg-blue-500 rounded shadow-md flex flex-col items-center justify-center space-y-4">
              <span className="text-white text-lg">Box {index + 1}</span>
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out"
                onClick={() => {
                  setSelectedMatch(match);
                  setIsPopupVisible(true);
                }}
              >
                Join
              </button>
            </div>
          </div>
        ))}
        {isPopupVisible && (
          <Popup
            onClose={() => setIsPopupVisible(false)}
            match={selectedMatch}
          />
        )}
        
      </div>
    );
}