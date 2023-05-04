/* direct communication with database using the server to fetch the current user*/

import {getServerSession} from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from "@/app/libs/prismadb"

export async function getSession() {
    return await getServerSession(authOptions)
}

// direct communication with the server component so it is best to avoid throwing errors instead use conditionals
export default async function getCurrentUser() {
    try {
        const session = await getSession() //gets session into server component


        if (!session?.user?.email) {
            return null 
        }

        //find current user 
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null
        }
        // returns the curretn user once it is found in order to validate the session
        return currentUser
    } catch (error: any) {
        return null
    }
}
