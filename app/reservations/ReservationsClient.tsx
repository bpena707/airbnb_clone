/* ReservationsClient help render different components on the page file this is where the heading and state is managed 
which is passed to page and renders the information
*/

'use client'

import { useRouter } from "next/navigation"
import Container from "../components/Container"
import Heading from "../components/Heading"
import { SafeUser, safeReservation } from "../types"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"


interface ReservationsClientProps {
    reservations: safeReservation[]
    currentUser?: SafeUser | null
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        // start by setting the state based on the id
        setDeletingId(id)

        // axios api call to cancel the reservation in the url 
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation cancelled")
            router.refresh()
        })
        .catch(() => {
            toast.error('Something went wrong.')
        })
        .finally(() => {
            setDeletingId('')
        })

    },[router])

  return (
    <Container>
        <Heading
            title="Reservations"
            subtitle="Bookings on your properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation) => (
                <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancel guest reservation"
                    currentUser={currentUser}
                />
            ))}

        </div>
    </Container>
  )
}

export default ReservationsClient