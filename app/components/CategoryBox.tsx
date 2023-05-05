/* 
the category box is where the icon along with the rest of the attributes will display in a box form 
*/
'use client'

import { IconType } from "react-icons"


interface CategoryBoxProps {
    icon: IconType
    label: string
    selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 cursor-pointer">
        <Icon size={26} />
        <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox