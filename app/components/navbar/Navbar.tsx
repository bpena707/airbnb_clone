'use client'

import Container from '../Container'
import Categories from './Categories'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'

/* have the current user logged in without using an api call */

//this is passed into layout to allow the use of the current user which is defined within prisma as well
interface NavbarProps {
  currentUser?: SafeUser | null
}


//this is the main navbar component. all navbar compponents are passed through here including the logo, search and userMenu 
// they are also all wrapped in the container
//the current user is also passed using the NavbarProps to allow login wihtout using api call
const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
    return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='p-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar