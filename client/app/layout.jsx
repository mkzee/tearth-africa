"use client"

import Styles from '@styles/globals.css'
import { Roboto } from 'next/font/google'
import { StateProvider } from "@context/StateContext"
import reducer, {initialState} from "@context/StateReducer"
import Nav from '@components/navbar'
import { useState } from 'react'



const roboto = Roboto({
    subsets: ['latin'],
    weight: '400'
})


const RootLayout = ({ children }) => {
    const [isloaded, setIsLoaded] = useState(false)

    const handlePageLoad = (value) => {
        setIsLoaded(value)
    }

    return (    
        <StateProvider initialState={initialState} reducer={reducer}>
            <html lang='en'>
              <body>
                  <main className={roboto}>
                      <Nav onLoad={handlePageLoad}></Nav>
                      { isloaded &&
                          <>
                              { children }
                          </>
                      }
                  </main>
              </body>
            </html>
        </StateProvider>
    );
  };
  
export default RootLayout