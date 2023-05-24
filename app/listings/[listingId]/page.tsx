/* this is the page that will appear when the user clicks the image div in listing card. the user is routed
via the listings/data route in ListingCard and this individual listing page appears. 
This is a SERVER comoponent so hooks are not allowed only direct communication with database. 
parameters can still be accessed which we access the id in the url
*/

import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import ListingClient from "./ListingClient"

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams } ) => {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()

    if (!listing) {
       return(
        <EmptyState />
       ) 
    }

    return(
        <ListingClient
            listing={listing}
            currentUser={currentUser}
        />
    )
}

export default ListingPage