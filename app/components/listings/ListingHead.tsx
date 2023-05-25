'use client'

import Image from "next/image"
import useCountries from "@/app/hooks/UseCountries"
import { SafeUser } from "@/app/types"
import React from "react"
import Heading from "../Heading"
import HeartButton from "../HeartButton"

interface ListingHeadProps {
  title: string
  locationValue: string
  imageSrc: string 
  id: string
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {

  // these const help us get the values needed both the useCountries hook and getByValue to be used in the components in the return statement
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    // a fragment is used because we are using many components withing this section and avoids introducing too many DOM elements
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      {/* this div helps put the image into its own and allows the use of relative to postion the image element under the heading
      automatically. styling is also applyed to the image as well such as rounding and w & h */}
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead