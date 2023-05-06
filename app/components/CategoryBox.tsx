/* 
the category box is where the icon along with the rest of the attributes will display in a box form 
*/
'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import qs from "query-string";


interface CategoryBoxProps {
    icon: IconType
    label: string
    selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,//alias is given so that it can be used as a comoponent
    label,
    selected
}) => {
    const router = useRouter()
    const params = useSearchParams()

    //this is the handle click callback function 
    const handleClick = useCallback(() => {
        //define the empty query 
        let currentQuery = {}

        //check to see if we have params at all 
        //create an object out of all current parameters by parsing 
        if (params) {
            currentQuery= qs.parse(params.toString())
        }

        //when clicking on the category boxes the current label is assigned as the category parent in url
        //spread query and add new category
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        //if we already selected a category we want it to remove all categoires (resets category when selected)
        if (params?.get('category') === label) {
            delete updatedQuery.category
        }

        //generate url with the newest query 
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true})//filter out empty options

        router.push(url)
    },[label, params, router])
  return (
    <div 
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'} ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}>
        <Icon size={26} />
        <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox