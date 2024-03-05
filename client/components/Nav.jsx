import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
    return (
        <nav className="h-[100px] flex-between w-full px-[60px]">
            <Link href="/">
                <div className='flex items-center'>
                    <Image 
                        src='/assets/tearthlogo.png'
                        alt="tearth africa logo"
                        width={100}
                        height={100}
                    />
                    <h1 className='text-tearthblack text-2xl font-bold'>tearth africa</h1>
                </div>
            </Link>
        </nav>
    )
}

export default Nav