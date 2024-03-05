"use client"

import Nav from "@components/Nav"
import Herobanner from "@components/Herobanner"
import Authwrapper from "@components/modal/Authwrapper"
import { useStateProvider } from "@context/StateContext"


const Home = () => {
    const [{ showLoginModal, showSignUpModal}] = useStateProvider()

    return (
        <div>
            <Nav />
            <Herobanner />
            {
                (showLoginModal || showSignUpModal) && (<Authwrapper type={showLoginModal ? "login" : "signup"}/>)
            }
        </div>
    )
}

export default Home