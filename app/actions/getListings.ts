// this component will be used to fetch the listings data 
import prisma from "@/app/libs/prismadb"

export interface IListingsParams {
    userId?: string
    guestRoomCount?: number
    roomCount?: number
    bathRoomCount?: number
    startDate?: string
    endDate?: string
    locationValue?: string
    category?: string
}

export default async function getListing(
    // since there is only one data point of userId no destructuring is necessary 
    params: IListingsParams
) {
    try {
        const { 
            userId,
            roomCount,
            guestRoomCount,
            bathRoomCount,
            locationValue,
            startDate,
            endDate,
            category

         } = params

        let query: any = {}

        if (userId) {
            query.userId = userId

        }

        if (category) {
            query.category = category
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestRoomCount) {
            query.guestRoomCount = {
                gte: +guestRoomCount
            }
        }

        if (bathRoomCount) {
            query.bathRoomCount = {
                gte: +bathRoomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte: startDate},
                                startDate: {lte: startDate}
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: endDate}
                            }
                        ]
                    }
                }
            }
        }

        // this will fetch all of the listings
        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc' //desc means descending order
            }
        })
    // this fixes the console warnign 
        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))

        return safeListings

    } catch (error: any) {
        throw new Error(error)
    }
}