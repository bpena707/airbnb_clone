'use client'

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import React, { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    // the menu item is toggeled as false so it wont show untill clicked on
    const [isOpen, setIsOpen] = useState(false)
    
    // toggles the isOpen state by setting it to the not value, reverses the current value
    // used in airbnb your home 
    const toggleOpen = useCallback(() => {
        setIsOpen((prevState) => !prevState)
      },[])

      const onRent = useCallback(() => {
        //if there is no current user we want to return the loginModal to be open
        if (!currentUser) {
            loginModal.onOpen()
        }

        //open rent modal
        rentModal.onOpen()
      },[rentModal, loginModal, currentUser])
    
  return (
    // this div is for the overall button which is just relative 
    <div className="relative">

        <div className="flex flex-row items-center gap-3">
            {/* this button will open the rent modal */}
            <div 
                onClick={onRent}//clicing on airbnb your home triggers the onRent function
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                Airbnb you home 
            </div>
            {/* this is going to be the user menu  */}
            <div 
                onClick={toggleOpen} //toggles the previous state when clicked 
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    {/* this is the hamburger menu */}
                <AiOutlineMenu /> 
                <div className="hidden md:block">
                    <Avatar src={currentUser?.image} />
                </div>
            </div>
        </div>

        {/* if the menu item is toggled open it will show up under the hamburger menu as a tab */}
        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                    {currentUser ? (
                        //these options display if the currentUser is logged in 
                        <>
                        <MenuItem 
                            onClick={() => router.push("/trips")}
                            label="My trips"
                        />
                        <MenuItem 
                            onClick={() => router.push("/favorites")} //prop that is passed that will make the registration modal pop up
                            label="My favorites"
                        />
                        <MenuItem 
                            onClick={() => router.push("/reservations")}
                            label="My reservations"
                        />
                        <MenuItem 
                            onClick={() => router.push("/properties")} //prop that is passed that will make the registration modal pop up
                            label="My properties"
                        />
                        <MenuItem 
                            onClick={rentModal.onOpen}
                            label="Airbnb my home"
                        />
                        <hr />
                        <MenuItem 
                            onClick={() => signOut()} //prop logs out using the server call 
                            label="Logout"
                        />
                    </>

                    ) : (
                        <>
                        <MenuItem 
                            onClick={loginModal.onOpen}
                            label="Login"
                        />
                        <MenuItem 
                            onClick={registerModal.onOpen} //prop that is passed that will make the registration modal pop up
                            label="Sign Up"
                        />
                    </>
                    )}
                </div>
            </div>
        )}     
    </div>
  )
}

export default UserMenu