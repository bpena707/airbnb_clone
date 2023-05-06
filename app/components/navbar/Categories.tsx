/* 
Categories is a component that renders under the navbar where the user will 
be able to click on based on what destination category the user would like to explore
*/

'use client'

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
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
        description: 'this property is modern!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'this property is in the countryside!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'this property has a pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'this property is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'this property is close a lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'this property has skiing activities!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'this property is in a castle!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'this property has camping activiteis!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'this property is close to the snow'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'this property is in a cave!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'this property is in the desert!'
    },
    {
        label: 'Barn',
        icon: GiBarn,
        description: 'this property is in the barn!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'this property is luxurious!'
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