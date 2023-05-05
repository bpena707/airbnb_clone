/* 
Categories is a component that renders under the navbar where the user will 
be able to click on based on what destination category the user would like to explore
*/

'use client'

import { TbBeach } from 'react-icons/tb'
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox"

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
  return (
    //this div forms the bar under the navbar and postiions the category boxes
    <div className='pt-4 flex flex-row items-center justify-between overscroll-x-auto'>
        {categories.map((item) => (
            <CategoryBox 
                key={item.label}
                label={item.label}
                icon={item.icon}
            />
        ))}
    </div>
  )
}

export default Categories