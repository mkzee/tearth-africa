import Link from 'next/link';
import Image from 'next/image';
import { useStateProvider } from '@context/StateContext';
import { reducerCases } from "@context/constants";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { GET_USER_INFO } from '@utils/constants';
import axios from 'axios';

const Nav = () => {
    const [cookies] = useCookies()
    const [isLoaded, setLoaded] = useState(true)
    const [{showLoginModal, showSignUpModal, userInfo, isTalent}, dispatch] = useStateProvider()

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
        { linkName: "Tearth Vision", handler: "#", type: "link" },
        { linkName: "Find Talent", handler: "#", type: "link" },
        { linkName: "Find companies", handler: "#", type: "link" },
        { linkName: "Become a member", handler: "#", type: "link" },
        { linkName: "Sign in", handler: handleLogin, type: "button" },
        { linkName: "Sign up", handler: handleSignup, type: "button2" },
      ];

    useEffect(() => {
        if (cookies.token, !userInfo) {
            const getUserInfo = async () => {
                try {
                    const response = await axios.post(GET_USER_INFO, {}, { withCredentials: true })
                    console.log(response)

                } catch (error) {
                    console.log(error)
                }
            }
          
            getUserInfo();
        }
    }, [cookies, userInfo])

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
                <div className='w-[60%]'>
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
                    </ul>
                </div>
            </nav>
        }</>
    )
}

export default Nav