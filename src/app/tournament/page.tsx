import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Tournament from "../components/tournament"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Tournament",
    description: "Jadwal Pertandingan Semua Sektor GBC UBT 2024"
}

const Page = async () => {

    const session = await getServerSession(authOptions)

    if (session?.user) {
        return(
            <div>
                <Tournament client={false}/>
            </div>
        )
    } else {
        return (
            <div>
                <Tournament client={true}/>
            </div>
        )
    }
}
export default Page;