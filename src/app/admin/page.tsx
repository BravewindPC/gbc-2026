import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async () => {

    const session = await getServerSession(authOptions)
    console.log("ini",session)

    if (session?.user) {
        return(
            <div>
                {/* <page */}
            </div>
        )
    } else {
        return (
            <div>
                Please login first
            </div>
        )
    }
}
export default page