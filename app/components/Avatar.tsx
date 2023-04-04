'use client'
import Image from "next/image";
function Avatar() {
  return (
    <div>
      <Image 
        className="rounded-full"
        src={"/images/placeholder.jpg"} 
        alt="Avatar"
        height="30"
        width="30"
      />
    </div>
  )
}

export default Avatar