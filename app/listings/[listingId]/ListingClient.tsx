/* this component is how th data will display on the page */
'use client' 

import Container from "@/app/components/Container"
import { categories } from "@/app/components/navbar/Categories"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useMemo } from "react"
import ListingHead from "../../components/listings/ListingHead"

interface ListingClientProps {
    reservations?: Reservation[]
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {
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
            </div>
        </div>
    </Container>
  )
}

export default ListingClient