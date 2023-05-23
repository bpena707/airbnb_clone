/* the listing card component is for the listing images that appear under the 
navbar in the main page. it will list all of the data for the each data and display 
it as a list on the main page. the data includes images, price, and location */

'use client'

import useCountries from "@/app/hooks/UseCountries"
import { SafeListing, SafeUser } from "@/app/types"
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { format } from "date-fns"
import Image from "next/image"
import { AiFillHeart } from "react-icons/ai"
import HeartButton from "../HeartButton"
import Button from "../Button"

// props for the listing card that includes all of data that will be displayed
interface ListingCardProps {
    data: SafeListing
    reservation?: Reservation
    onAction?: (id: string) => void
    disabled?: boolean
    actionLabel?: string
    actionId?: string
    currentUser?: SafeUser | null 
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter()
    //getbyvalue grabs the props that form the useCountries cutom hook. same with location 
    const { getByValue } = useCountries()
    const location = getByValue(data.locationValue)

    // the handle cancel useCallback 
    const handleCancel = useCallback(
        // the event handler function expects the event object mouse event triggered by the button click and stop propagation 
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()

            if (disabled) {
                return
            }
            

            onAction?.(actionId)
        },[disabled, onAction, actionId])
        
        // price data is memoized and depends on changes to reservationa nd price if reservation exists the total price is displayed
    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }

        return data.price
    },[reservation, data.price])

    // constant for the reservation date displyas from, start and end date
    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`


    },[reservation])


  return (
    // this div is for the back the card image sits on 
    <div 
        onClick={() => router.push(`/listing/${data.id}`)} //this router will push to the single listing when user clicks on it
        className="col-span-1 cursor-pointer group "
    >
        {/* this div formats the order of the cards  */}
        <div className="flex flex-col gap-2 w-full">
        {/* this is the image that is placed on the the card div */}
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image 
                    fill
                    alt="Listing"
                    src={data.imageSrc}
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                />
                {/* this is the heart button that renders from the heart button component which is toggled by user onCLick event */}
                <div className="absolute top-3 right-3">
                    <HeartButton
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            {/* this area is for that text data that appears under the listing card  */}
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                        {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    // this button will be used to cancel a reservation 
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
        </div>
    </div>
  )
}

export default ListingCard