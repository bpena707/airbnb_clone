/* 
Categories is a component that renders under the navbar where the user will 
be able to click on based on what destination category the user would like to explore
*/

'use client'

import { TbBeach } from 'react-icons/tb'
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox"
import { use } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// categories is an array of objects that will be mapped over and rendered within 
//the category box component
export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'this property has windmills!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'this property is close to the beach!'
    }
]

const Categories = () => {
    //make it so the categories can read from the url and show a selected option of itself
    const params = useSearchParams()
    //extract the category from the params 
    const category = params?.get('category')
    const pathname = usePathname() //unselect the categories box when one of the boxes is selected

    const isMainPage = pathname === '/'

    //if we are not on the main page return a null
    if (!isMainPage) {
        return null
    }


  return (
    //this div forms the bar under the navbar and postiions the category boxes
    <div className='pt-4 flex flex-row items-center justify-between overscroll-x-auto'>
        {categories.map((item) => (
            <CategoryBox 
                key={item.label}
                label={item.label}
                selected={category === item.label}
                icon={item.icon}
            />
        ))}
    </div>
  )
}

export default Categories