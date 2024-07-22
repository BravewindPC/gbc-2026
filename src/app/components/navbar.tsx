"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

export const Navbar = () => {
    const [isnav, shownav] = useState(false);
    const currentPath = usePathname();

    const linkClass = (path: string) => 
        `shadow-outline ${currentPath === path ? ' py-2 px-3 rounded-lg bg-templatePaleYellow shadow-[0_10px_20px_-12px_rgb(0,0,0,0.25)] shadow-templatePaleYellow' : ''}`;

    return (
        <div className="z-30 relative w-full h-[80px] sm:h-[110px]">
            <Image src="/bg.png" alt="bg" layout="fill" objectFit="cover" />
            <Image src="/Header.png" alt="header-img" layout="fill" objectFit="cover" />
            <div className="absolute left-2 flex items-center h-full">
                <div className="sm:hidden cursor-pointer">
                    <Link href="/">
                        <Image 
                            src="/Logo.png" 
                            width={65} 
                            height={65} 
                            alt="logo" 
                            objectFit="contain" 
                            priority
                        />
                    </Link>
                </div>
                <div className="hidden sm:inline-block cursor-pointer">
                    <Link href="/">
                        <Image 
                            src="/Logo.png" 
                            width={95} 
                            height={95} 
                            alt="logo" 
                            objectFit="contain" 
                            priority
                        />
                    </Link>
                </div>
                <div className="flex flex-col font-balmy text-templatePaleYellow text-[13px] sm:text-xl lg:text-2xl gap-0 cursor-pointer">
                    <Link href="/">
                        <div className="shadow-outline-low">Ganesha Badminton</div>
                    </Link>
                    <Link href="/">
                        <div className="shadow-outline-low">Championship</div>
                    </Link>
                </div>
            </div>
            <div className="hidden md:inline-block h-full">
                <div className="md:absolute right-10 lg:right-16 gap-4 lg:gap-10 flex items-center justify-center h-full font-balmy text-xl lg:text-2xl text-templatePaleYellow">
                    <Link href="/">
                        <div className={linkClass('/')}>Home</div>
                    </Link>
                    <Link href="/tournament">
                        <div className={linkClass('/tournament')}>Tournament</div>
                    </Link>
                    <Link href="/bracket">
                        <div className={linkClass('/bracket')}>Bracket</div>
                    </Link>
                    <Link href="/documentation">
                        <div className={linkClass('/documentation')}>Documentation</div>
                    </Link>
                </div>
            </div>
            <div className="absolute md:hidden right-6 flex items-center h-full">
                <button onClick={() => shownav(true)} className="flex justify-center items-center w-[41px] h-[41px] bg-templateBlue rounded-full">
                    <div className="w-[25px] h-[25px] bg-templateBlue rounded-full">
                        <Image src="/hamburger.svg" alt="menu-button" width={80} height={80} objectFit="cover" />
                    </div>
                </button>
            </div>

            {isnav && (
                <div className="md:hidden fixed z-30 w-full h-screen bg-black bg-opacity-50">
                    <div className="absolute bg-templateDarkBlue right-0 w-3/4 max-w-[300px] gap-6 h-screen flex flex-col justify-center items-center font-balmy text-xl sm:text-2xl text-templatePaleYellow animated-navbar">
                        <Image src="/bgh.png" alt="bg-star" layout="fill" objectFit="cover" />
                        <div className="cursor-pointer absolute top-4 right-4" onClick={() => shownav(false)}>
                            <IoCloseCircle size="35px" />
                        </div>
                        <Link href="/" className="z-10">
                            <div className={linkClass('/')}>Home</div>
                        </Link>
                        <Link href="/tournament" className="z-10">
                            <div className={linkClass('/tournament')}>Tournament</div>
                        </Link>
                        <Link href="/bracket" className="z-10">
                            <div className={linkClass('/bracket')}>Bracket</div>
                        </Link>
                        <Link href="/documentation" className="z-10">
                            <div className={linkClass('/documentation')}>Documentation</div>
                        </Link>
                        <div className="mt-12 z-10">
                            <Image src="/UBT_White.png" className="animated-navbar-component" width={150} height={150} alt="logo-UBT" objectFit="contain" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
