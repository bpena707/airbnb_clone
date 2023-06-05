// this component will be used to fetch the listings data 
import prisma from "@/app/libs/prismadb"

export interface IListingsParams {
    userId?: string
}

export default async function getListing(
    // since there is only one data point of userId no destructuring is necessary 
    params: IListingsParams
) {
    try {
        const { userId } = params

        let query: any = {}

        if (userId) {
            query.userId = userId
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