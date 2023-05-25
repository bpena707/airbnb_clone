/* this component is how th data will display on the page */
'use client' 

import Container from "@/app/components/Container"
import { categories } from "@/app/components/navbar/Categories"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useMemo } from "react"
import ListingHead from "../../components/listings/ListingHead"
import ListingInfo from "@/app/components/listings/ListingInfo"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useRouter } from "next/navigation"
import { eachDayOfInterval } from "date-fns"

// this constant sets the start and end date 
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: Reservation[]
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [], // reservations is set to an empty array in case there are no reservations
    currentUser
}) => {
    const loginModal = useLoginModal()
    const router = useRouter()

    // iterate over reservations and see any dates we have to disable for reservation in case there is a reservation already booked for it
    const disabledDates = useMemo(() => {
        let dates: Date[] = [] //this is an empty array of dates

        // this is the part where all of the reservations are iterated over. a range of dates is created between start and end date
        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            // dates are passed to already existing dates array
            dates = [...dates, ...range]
        })

        return dates
    },[reservations])

    // TODO: states and functions to create reservations

    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === listing.category)
    },[listing.category])

  return (
    <Container>
        <div>
            <div>
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div>
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient