// "use client"

import Homepage from "@components/Homepage"

export const metadata = {
    title: "Tearth Africa",
    description: "Dare to Dream"
}
// import { useState, useEffect } from "react"
// import { StateProvider } from "@context/StateContext"
// import reducer, {initialState} from "@context/StateReducer"

const Home = () => {
    // const [isLoaded, setIsLoaded] = useState(false)

    const handleSetIsLoaded = (value) => {
        // setIsLoaded(value)
    } 

    return (
        // <StateProvider initialState={initialState} reducer={reducer}>
            <div>
                {/* {isLoaded &&  */}
                <div className="mb-auto mx-auto w-full">
                    <Homepage />
                </div>
            </div>
        // </StateProvider> 
    )
}

export default Home