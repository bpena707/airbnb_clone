import getCurrentUser from "../actions/getCurrentUser"
import getListing from "../actions/getListings"
import getReservations from "../actions/getReservations"
import EmptyState from "../components/EmptyState"
import PropertiesClient from "./PropertiesClient"

const PropertiesPage = async () => {
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

    const listings = await getListing({
        userId: currentUser.id
    })

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties"
            />
        )
    }

    return(
        <PropertiesClient 
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default PropertiesPage