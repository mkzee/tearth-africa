import Styles from '@styles/globals.css'
import { Roboto } from 'next/font/google'



const roboto = Roboto({
    subsets: ['latin'],
    weight: '400'
})

export const metadata = {
    title: "Tearth Africa",
    description: "Dare to Dream"
}

const RootLayout = ({ children }) => {
    return (
      <html lang='en'>
        <body>
          <main className={roboto}>
            { children }
          </main>
        </body>
      </html>
    );
  };
  
export default RootLayout