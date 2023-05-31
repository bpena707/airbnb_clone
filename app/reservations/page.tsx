/* this is for the my reservations page that will appear when the user clicks on the my reservations tab under the profile menu */

import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import EmptyState from "../components/EmptyState"
import ReservationsClient from "./ReservationsClient"

const ReservationsPage =async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    // fetches the reservations using the authorId to load all reservations on our listings not the trips but all of the reservations
    // other users have made on our listing
    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your property"
            />
        )
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )

}

export default ReservationsPage