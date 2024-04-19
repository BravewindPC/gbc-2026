import Image from "next/image";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar"

export default function Home() {
    return (
        <div className=" text-templateDarkBlue w-full">
            <div className="flex flex-col items-center w-[85%] mx-auto my-5 custom:my-11 bg-gradient-custom2 p-5 rounded-xl md:rounded-3xl">
                <div className="flex items-center h-[20%] custom:h-[30%] md:h-[50%]">
                    <div className="w-[130px] h-[130px] custom:w-[220px] custom:h-[220px] md:w-[400px] md:h-[400px] thick-shadow">
                        <Image src="/LogoS.png" layout="fill" alt="logo" objectFit="contain" />
                    </div>
                    <div className="flex flex-col font-balmy text-[10px] custom:text-base md:text-2xl text-templatePaleYellow thick-shadow">
                        <div>Ganesha</div>
                        <div>Badminton</div>
                        <div>Championship</div>
                        <div>2024</div>
                    </div>
                </div>
                <div className="mt-4 sm:mt-14 lg:mt-18 text-[10px] custom:text-lg md:text-2xl font-balmy text-templateWhite thick-shadow">
                    About GBC
                </div>
                <div className=" mt-2 sm:mt-4 lg:mt-8 w-[80%] font-monserrat text-[6px] custom:text-sm md:text-base text-templateWhite text-center">
                    Ganesha Badminton Championship adalah sebuah kompetisi yang diselenggarakan oleh 
                    Unit Bulu Tangkis Institut Teknologi Bandung (UBT ITB). 
                    Ganesha Badminton Championship dilaksanakan 
                    setiap 2 tahun sekali secara bergantian dengan OLIM KM yang diselenggarakan oleh KM ITB. 
                    Ganesha Badminton Championship bertujuan untuk mewadahi minat dan bakat mahasiswa ITB dalam 
                    bidang bulu tangkis yang dilakukan dengan mengadakan suatu kompetisi bulu tangkis.
                </div>
                <div className="mt-8 sm:mt-20 lg:mt-32 text-base custom:text-2xl md:text-4xl font-balmy text-templateWhite thick-shadow">
                    Tanggal
                </div>
                <div className=" mt-3 sm:mt-14 lg:mt-18 w-[80%] font-monserrat text-xs custom:text-lg md:text-2xl text-templateWhite text-center font-bold">
                    20 April - 5 May 2024
                </div>
                <div className="mt-12 sm:mt-20 lg:mt-32 text-base custom:text-2xl md:text-4xl font-balmy text-templateWhite thick-shadow">
                    Lokasi
                </div>
                <div className=" mt-3 sm:mt-14 lg:mt-18 w-[80%] font-monserrat text-xs custom:text-lg md:text-2xl text-templateWhite text-center font-bold">
                    GOR KONI
                </div>
                <div className=" mt-2 sm:mt-4 w-[80%] font-monserrat text-[6px] custom:text-sm md:text-base text-templateWhite text-center">
                    Jl. Jakarta No.18, Kacapiring, Kec. Batununggal, Kota Bandung, Jawa Barat
                </div>
                <div className=" mt-52 sm:mt-60 lg:mt-32 text-xl custom:text-3xl md:text-5xl font-balmy text-templateWhite thick-shadow">
                    SPONSORSHIP
                </div>
                <div className=" mt-3 sm:mt-8 lg:mt-18 w-full h-[50px] custom:h-[100px] md:h-[180px]">
                    <Image src="/sponsor.png" layout="fill" alt="logo" objectFit="contain" />
                </div>
            </div>
        </div>
    );
}