"use client"

import React from 'react';
import {
    HOST,
    IMAGES_URL,
    SET_USER_IMAGE,
    SET_USER_INFO,
  } from "@utils/constants";
import { useState, useEffect } from 'react';
import { useStateProvider } from '@context/StateContext';
import { useRouter } from "next/router";
import Image from 'next/image';
import { FaCommentsDollar } from 'react-icons/fa';

const profile = () => {
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ imageHover, setImageHover ] = useState(false)
    const [ image, setImage ] = useState(undefined)
    const [{ userInfo }, dispatch] = useStateProvider();
    const [ data, setData ] = useState({
        userName: "",
        fullName: "",
        description: ""
    })

    useEffect(() => {
        const handleData = data
        if (userInfo?.userName) handleData.userName = userInfo?.userName;
        if (userInfo?.description) handleData.description = userInfo?.description;
        if (userInfo?.fullName) handleData.fullName = userInfo?.fullName;
        console.log(userInfo)

        
        if (userInfo?.imageName) {
            const fileName = image;
            fetch(userInfo.imageName).then(async (response) => {
                const contentType = response.headers.get("content-type");
                const blob = await response.blob();
                // @ts-ignore
                const files = new File([blob], fileName, { contentType });
                // @ts-ignore
                setImage(files);
            })

            setData(handleData);
            setIsLoaded(true);
        }
    }, [userInfo])

    
    const handleFile = (e) => {
        let file = e.target.files
        const fileType = file[0]["type"]
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
             setImage(file[0]);
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };

    const setProfile = async () => {
        try {
            const response = await axios.post(
                SET_USER_INFO,
                { ...data },
                { withCredentials: true }
            );

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const inputClassName = "block p-4 text-sm text-gray-900 border w-full border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500";
    const labelClassName = "mb-2 text-lg font-medium text-gray-900  text-tearthblack";

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
                    className="flex justify-between rounded-sm items-center w-[55%] border border-slate-300"
                >
                    <div 
                        className="bg-tearthgreen m-[20px] cursor-pointer h-20 w-20 flex items-center justify-center rounded-full relative"
                        onMouseEnter={() => setImageHover(true)}
                        onMouseLeave={() => setImageHover(false)}
                    >
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
                <div className=' w-[55%]'>
                    <div className="w-full mb-[20px]">
                        <label className={labelClassName} htmlFor="userName">
                            Username
                        </label>
                        <input
                            className={inputClassName}
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="Username"
                            value={data.userName}
                              onChange={handleChange}
                        />
                    </div>
                    <div className="w-full mb-[20px]">
                        <label className={labelClassName} htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            className={inputClassName}
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Full Name"
                            value={data.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full mb-[20px]">
                        <label className={labelClassName} htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="description"
                        ></textarea>
                    </div>
                    <div className='w-full flex justify-center'>
                        <button
                            className="border text-lg font-semibold px-5 py-3 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
                            type="button"
                            onClick={setProfile}
                        >
                            Set Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default profile