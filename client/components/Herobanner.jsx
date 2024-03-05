import Image from "next/image";
import { CiSearch } from "react-icons/ci";

const Herobanner = () => {
    return (
        <div className="h-[721px] bg-tearthbrown py-[100px] px-[60px] rounded-2xl">
            <div className="relative h-full flex items-center">

                <div className="w-[600px] z-[50]">
                    <h1 className="text-white text-5xl font-bold">
                        Find <i>freelance</i> jobs specially tailored for you
                    </h1>

                    <div className="flex my-[30px]">
                        <input 
                            className="w-full h-[45px] p-[10px] rounded-l" 
                            type="search" 
                            placeholder="Search for a service"
                        />
                        <button className="bg-tearthgreen w-[13%] rounded-r">
                            <CiSearch className="text-white text-3xl m-auto"/>
                        </button>
                    </div>
                </div>

                <Image
                    src="/assets/img2.png"
                    className="absolute top-0 end-0"
                    width={500}
                    height={500}
                    alt="lady in cooperate wear"
                />
            </div>
        </div>
    )
}

export default Herobanner