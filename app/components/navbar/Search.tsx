'use client'
import { BiSearch } from "react-icons/bi";

function Search() {
  return (
    // this div is for the overall rounded button 
    <div className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
        {/* this div is for the the items within the div  */}
        <div className="flex flex-row items-center justify-between">
            {/* the rest here is the divs that open up different modals  */}
            <div className="text-sm font-semibold px-6">
                Anywhere
            </div>
            <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                Any Week 
            </div>
            {/* this div has two buttons in one which is why its on its own separate div */}
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block">
                    Add Guests
                </div>
                <div className="p-2 rounded-full bg-rose-500 text-white"> 
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search