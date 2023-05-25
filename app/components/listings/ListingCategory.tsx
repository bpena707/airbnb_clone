/* the listing category displays information about the listing category and renders under the hosted by info in listing info */
'use client'

import { IconType } from "react-icons"

interface ListingCategoryProps {
    icon: IconType
    label: string
    description: string
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
    icon: Icon,
    label,
    description
}) => {
  return (
    <div className="flex flex-col gap-6">
        {/* this div handles the area surrounding the information */}
        <div className="flex flex-row items-center gap-4">
            <Icon size={40} className="text-neutral-600" />
            {/* this div is for the area around the text */}
            <div className="flex flex-col">
                <div className="text-lg font-semibold">
                    {label}
                </div>
                <div className="text-neutral-500 font-light">
                    {description}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingCategory