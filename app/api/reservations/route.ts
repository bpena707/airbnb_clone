/* this is the route that is triggered after the user clicks on the reserve button under the calendar */

import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  // start by getting the current user
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // once parsed the json request is set to the body, the body is desctructed to extract the payload variables and assign to body
  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  // if the the parameters are not filled it returns an error
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  // prisma updates
  const listingAndReservation = await prisma.listing.update({
    // where is for locating the specific record update
    where: {
      id: listingId,
    },
    // data object contains the updated values
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
