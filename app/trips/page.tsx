import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import EmptyState from "../components/EmptyState"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    // the following ifs are edge cases if there is no user session or if no reservations are booked
    if (!currentUser) {
        return (
            <EmptyState 
                title="Aunauthorized"
                subtitle="Please login"
            />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    })

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you havent reserved any trips"
            />
        )
    }

    return(
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage