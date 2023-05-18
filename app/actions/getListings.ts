// this component will be used to fetch the listings data 
import prisma from "@/app/libs/prismadb"

export default async function getListing() {
    try {
        // this will fetch all of the listings
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc' //desc means descending order
            }
        })
        return listings
    } catch (error: any) {
        throw new Error(error)
    }
}