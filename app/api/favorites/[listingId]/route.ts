/* this file contains the routes for the favorites button on the listing card when the user toggles the heart 
hooks are used to call these routes and use them. 
*/

import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

interface IParams {
    listingId?: string
}

// the POST is triggered when the user likes a post 
// function has the request as a Request and destructured params that sets Iparams to params .
export async function POST(
    request: Request,
    { params }: {params: IParams}
) {

    
    const currentUser = await getCurrentUser()

    // if no user is found NextResponse throws an error
    if (!currentUser) {
        return NextResponse.error()
    }
    

    //the destructed listting becomes the params 
    const { listingId } = params

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    }

    // favoriteId spreads the data that was prevoiusly favorited by the current user or creates a new array where the favorites are stored
    let favoriteIds = [...(currentUser.favoriteIds || [])]

    // the listingId is pushed into the favoriteId
    favoriteIds.push(listingId)

    // updates the user where the id is the currentUser and updates the favoriteId data
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    // returns response as a json user
    return NextResponse.json(user)
}

// delete is triggered when a user unlikes a post
export async function DELETE(
    request: Request, //request is of type  resource Request API
    {params}:{params: IParams} //params of the type interface IParams which carries the listing id
    ) {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
        return NextResponse.error()
    }

    // extract the listingId that is passed from the ListingCard
    const { listingId } = params

    // if there is no listingID or the typeof checking is not a string throw new error 
    if(!listingId || typeof listingId !== 'string'){
        throw new Error('Invalid ID')
    }
    // modify the favoriteId by spread of the favortiedid the current user already has or pass an empyt array
    let favoriteIds = [...(currentUser.favoriteIds || [])]
    // filter and remove the id that matches the listingId
    favoriteIds = favoriteIds.filter((id) => id !== listingId)
    // update the user on prisma
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds
        }
    })

    return NextResponse.json(user)
}

