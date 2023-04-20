'use client'

import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

//this is the main navbar component. all navbar compponents are passed through here including the logo, search and userMenu 
// they are also all wrapped in the container
function Navbar() {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='p-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo />
                    <Search />
                    <UserMenu />
                </div>
            </Container>
        </div>
        
    </div>
  )
}

export default Navbar