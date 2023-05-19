'use client'

import useCountries from "@/app/hooks/UseCountries"
import { SafeUser } from "@/app/types"
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

interface ListingCardProps {
    data: Listing
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
        
        

  return (
    <div></div>
  )
}

export default ListingCard