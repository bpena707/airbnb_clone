'use client'
//this is where the logo is styled and rendered
import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
    const router = useRouter() //this will be used to route back to the homepage after 
  return (
    //the image is sourced from the local file of public images
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