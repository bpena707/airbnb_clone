import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

interface IParams {
    reservationId?: string
}

export async function DELETE(
    resquest:Request,
    { params }: {params: IParams}
    ) {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.error()
        }

        // extracts the reservationId from params
        const { reservationId } = params

        // check if the reservationId is valid. if no id or the id is not a string throw error
        if (!reservationId || typeof reservationId != 'string') {
            throw new Error('Invalid ID')
        }

        // deleteMany is used since we have specific queries for it 
        // the only users that can delete are the uers booking the appointment or the owner of the listing looking to delete under the id of the user who booked it
        const reservation = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                // OR searches in an array of objects of the userId, listing id
                OR: [
                    { userId: currentUser.id },
                    { listing: { userId: currentUser.id } }
                ]
            }
        })

        return NextResponse.json(reservation)
}