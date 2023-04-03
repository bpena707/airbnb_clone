'use client'
//this is where the logo is styled and rendered
import Image from "next/image";
import { useRouter } from "next/navigation";


//component
function Logo() {
    const router = useRouter()
  return (
    <Image 
        src={"/images/logo.png"} 
        alt={"Logo"} 
        className="hidden md:block cursor-pointer"
        height='100'
        width='100' 
    />
  )
}

export default Logo