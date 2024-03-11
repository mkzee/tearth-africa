"use client"

import Nav from "@components/navbar"
import Homepage from "@components/Homepage"
import { StateProvider } from '@context/StateContext'
import reducer, { initialState } from '@context/StateReducer'


const Home = () => {
    return (
        <div>
            <StateProvider initialState={initialState} reducer={reducer}>
                <Nav></Nav>
                <div  className="mb-auto mx-auto w-full">
                    <Homepage />
                </div>
            </StateProvider>  
        </div>
    )
}

export default Home