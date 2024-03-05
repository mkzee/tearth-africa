"use client"

import Styles from '@styles/globals.css'
import { Roboto } from 'next/font/google'
import { StateProvider } from '@context/StateContext'
import reducer, { initialState } from '@context/StateReducer'

const roboto = Roboto({
    subsets: ['latin'],
    weight: '400'
})

// export const metadata = {
//     title: "Tearth Africa",
//     description: "Dare to Dream"
// }

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <StateProvider initialState={initialState} reducer={reducer}>
                    <main className={roboto.className}>
                        {children}
                    </main>
                </StateProvider>
            </body>
        </html>
    )
}

export default RootLayout