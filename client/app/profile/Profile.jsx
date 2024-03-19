"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useStateProvider } from '@context/StateContext'
import Image from 'next/image'

const profile = () => {
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ imageHover, setImageHover ] = useState(false)
    const [ image, setImage ] = useState(undefined)
    const [{ userInfo }, dispatch] = useStateProvider();

    
    const handleFile = (e) => {
        let file = e.target.files
        const fileType = file[0]["type"]
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
             setImage(file[0]);
        }
    }



    return (
        <div className="flex flex-col items-center justify-start min-h-[80vh] gap-3 text-tearthblack p-[30px]">
            {errorMessage && (
                <div>
                    <span className="text-red-600 font-bold">{errorMessage}</span>
                </div>
            )}

            <h3 className='text-1xl font-bold'>Edit profile</h3>
            
            <div className="flex flex-col items-center w-full gap-5">
                <div
                    className="flex justify-between rounded-sm items-center cursor-pointer w-[60%] border border-slate-300"
                    onMouseEnter={() => setImageHover(true)}
                    onMouseLeave={() => setImageHover(false)}
                >
                    <div className="bg-tearthgreen m-[20px] h-20 w-20 flex items-center justify-center rounded-full relative">
                        {image ? (
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="profile"
                                fill
                                className="rounded-full"
                            />
                        ) : (
                            <span className="text-5xl text-white">
                                {userInfo?.email[0].toUpperCase()}
                            </span>
                        )}
                        <div
                            className={`absolute bg-slate-400 h-full w-full rounded-full flex items-center justify-center   transition-all duration-100  ${
                            imageHover ? "opacity-100" : "opacity-0"
                        }`}
                        >
                            <span
                                className={` flex items-center justify-center  relative`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-12 h-12 text-white absolute"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    id="profileImg"
                                    type="file"
                                    onChange={handleFile}
                                    className="opacity-0"
                                    multiple={true}
                                    name="profileImage"
                                />
                            </span>
                        </div>
                    </div>
                    <label 
                        className="mb-2 cursor-pointer bg-tearthbrown text-base font-medium 
                        text-white hover:bg-tearthgreen p-[10px] rounded duration-200 mr-[20px]" 
                        htmlFor="profileImg"
                    >
                        Select image
                    </label>
                </div>
            </div>
        </div>
    )
}

export default profile