import Image from "next/image"


export const Footer = () => {
    return(
        <div className="relative w-full h-36 sm:h-56 bottom-0">
            <Image src="/bg.png" alt="bg" layout="fill" objectFit="cover" />
            <Image src="/Footer.png" alt="bg" layout="fill" objectFit="cover"/>

            <div className=" absolute w-full h-full">
                <div className="flex justify-center sm:justify-evenly items-center font-balmy text-templatePaleYellow text-[8px] custom:text-[12px] sm:text-xl w-full h-full">
                    <div className="custom:hidden">
                        <Image src="/Logo.png" alt="bg" width={60} height={60} />
                    </div>
                    <div className="hidden custom:inline-block sm:hidden">
                        <Image src="/Logo.png" alt="bg" width={90} height={90} />
                    </div>
                    <div className="hidden sm:inline-block">
                        <Image src="/Logo.png" alt="bg" width={150} height={150} />
                    </div>
                    {/* <div className=" flex flex-col items-center">
                        <div className=" flex gap-2">
                            <div>A</div>
                            <div>B</div>
                            <div>C</div>
                            <div>D</div>
                        </div> */}
                        <div className=" flex flex-col items-center">
                            <div>Copyright ©</div>
                            <div>GANESHA BADMINTON CHAMPIONSHIP</div>
                            <div>UNIT BULU TANGKIS ITB</div>
                        </div>
                    {/* </div> */}
                    <div className="custom:hidden">
                        <Image src="/UBT_White.png" alt="bg" width={60} height={60} />
                    </div>
                    <div className="hidden custom:inline-block sm:hidden">
                        <Image src="/UBT_White.png" alt="bg" width={90} height={90} />
                    </div>
                    <div className="hidden sm:inline-block">
                        <Image src="/UBT_White.png" alt="bg" width={150} height={150} />
                    </div>
                </div>
            </div>
        </div>
    )
}