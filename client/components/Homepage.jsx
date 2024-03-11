"use client"

import Herobanner from "@components/Herobanner";
import Authwrapper from "@components/modal/Authwrapper";
import { useStateProvider } from "@context/StateContext";



const Homepage = () => {
    const [{ showLoginModal, showSignUpModal}] = useStateProvider()

    return (
        <div>
            <Herobanner />
            {
                (showLoginModal || showSignUpModal) && (<Authwrapper type={showLoginModal ? "login" : "signup"}/>)
            }
        </div>
    )
}

export default Homepage