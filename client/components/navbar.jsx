"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useStateProvider } from '@context/StateContext';
import { reducerCases } from "@context/constants";
import { useCookies } from 'react-cookie';
import { GET_USER_INFO } from '@utils/constants';
import axios from 'axios';
import { CiSearch } from "react-icons/ci"
import { HOST } from '@utils/constants';

const Nav = ({onLoad}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [cookies] = useCookies()
    const [{showLoginModal, showSignUpModal, userInfo}, dispatch] = useStateProvider()
    const [ searchData, setSearchData ] = useState("")

    useEffect(() => {
        if (cookies.token && !userInfo) {
            const getUserInfo = async () => {
                try {
                    const {data: {user}} = await axios.post(GET_USER_INFO, {}, { withCredentials: true })
                    let projectedUser = {...user}
                    if (user.image) {
                        projectedUser = {
                            ...projectedUser,
                            imageName: HOST + "/" + user.image
                        }
                        delete projectedUser.image
                    }
                    setIsLoaded(true)
                    onLoad(true)
                    dispatch({
                        type: reducerCases.SET_USER,
                        userInfo: projectedUser
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            getUserInfo();
        } else {
            setIsLoaded(true)
            onLoad(true)
        }
    }, [cookies, userInfo])

   

    const handleLogin = () => {
        console.log('login is working')
        if (showSignUpModal) {
          dispatch({
            type: reducerCases.TOGGLE_SIGNUP_MODAL,
            showSignUpModal: false,
          });
        }
        dispatch({
          type: reducerCases.TOGGLE_LOGIN_MODAL,
          showLoginModal: true,
        });
      };
    
      const handleSignup = () => {
        console.log('signup is working')
        if (showLoginModal) {
          dispatch({
            type: reducerCases.TOGGLE_LOGIN_MODAL,
            showLoginModal: false,
          });
        }
        dispatch({
          type: reducerCases.TOGGLE_SIGNUP_MODAL,
          showSignUpModal: true,
        });
      };

    const links = [
        { linkName: "Home", handler: "#", type: "link" },
        { linkName: "Jobs", handler: "#", type: "link" },
        { linkName: "Talent Signup", handler: "#", type: "link" },
        { linkName: "contact Us", handler: "#", type: "link" },
        { linkName: "About Us", handler: "#", type: "link" },
        { linkName: "Sign in", handler: handleLogin, type: "button" },
        { linkName: "Sign up", handler: handleSignup, type: "button2" },
      ];


    const userNavLinkClass = "cursor-pointer font-medium text-tearthgreen duration-200"
    
    return (
        <>{ isLoaded &&
            <nav className="h-[100px] flex justify-between items-center w-full px-[60px]">                
                <div className="w-[250px] min-w-[250px]">
                    <Link className="flex items-center" href="/">
                        <Image 
                            src='/assets/tearthlogo.png'
                            alt="tearth africa logo"
                            width={100}
                            height={100}
                        />
                        <h1 className='text-tearthblack text-2xl font-bold'>tearth africa</h1>
                    </Link>
                </div>
                {/* <div className="flex opacity-100">
                    <input
                        type="text"
                        placeholder="What service are you looking for today?"
                        className="w-[20rem] py-2.5 px-4 border"
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                    />
                    <button
                        className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
                        onClick={() => {
                            setSearchData("");
                            router.push(`/search?q=${searchData}`);
                        }}
                    >
                        <CiSearch className="fill-white text-white h-6 w-6" />
                    </button>
                 </div> */}
                <div className='w-[50%]'>
                    { !userInfo ?
                    <ul className="flex items-center justify-between">
                        {
                            links.map(({linkName, handler, type}) => {
                                return (
                                    <li 
                                        key={linkName}
                                        className='font-semibold text-tearthblack text-lg'
                                    >
                                        {
                                            type === "link" && 
                                            <Link className="hover:text-tearthgreen duration-200" href={handler}>{linkName}</Link>}
                                        {type === "button" && <button className='hover:text-tearthgreen duration-500' onClick={handler}>{linkName}</button>}
                                        {type === "button2" && 
                                            <button 
                                                className='hover:text-white hover:bg-tearthgreen hover:border-tearthgreen 
                                                duration-200 py-1 px-3 rounded-md border border-tearthbrown'
                                                onClick={handler}
                                            >
                                                {linkName}
                                            </button>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul> :
                    <ul className='flex items-center justify-between'>
                        <li className={userNavLinkClass}>Dashboard</li>
                        <li className={userNavLinkClass}>Messages</li>
                        <li className={userNavLinkClass}>Gigs</li>
                        <li className={userNavLinkClass}>Orders</li>
                        <li
                            className='cursor-pointer'
                            onClick={(e) => {
                                e.stopPropagation
                                //setIsContextMenuVisible(true)
                            }}
                            title='profile'
                        >
                            {userInfo?.imageName ? (
                                <Image
                                    src={userInfo.imageName}
                                    alt='profile'
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                            ) : (
                                <div className='bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative'>
                                    <span className='text-xl text-white'>
                                        {userInfo.email[0].toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </li>
                    </ul>
                    }
                </div>
            </nav>
        }</>
    )
}

export default Nav