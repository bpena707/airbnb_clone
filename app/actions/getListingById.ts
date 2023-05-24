/* this is used to load the individual listing from the id provided in the parameters
direct communication from server component to database */

import prisma from "@/app/libs/prismadb"

interface IParams {
    listingId?: string
}

export default async function getListingById(
    params: IParams
    ) {
    try {
        // use destructuring to extract the listingId from the params
        const { listingId } = params

        // use the prisma function to find the unique listing so we can load the user image and name of listing owner
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })

        // in case there is no listing the function returns null 
        if (!listing) {
            return null 
        }

        // sanitzed listing to avoid console warning that we are passing a date object when a string is required accross different lisitng attributes
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: 
                    listing.user.emailVerified?.toISOString() || null //the email is optional since not every user may not have an email attached to account
            }
        }

    } catch (error: any) {
        throw new Error(error)
    }
}

