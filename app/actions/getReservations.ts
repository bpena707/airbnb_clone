/* Action for a server component: when the user selects the date range, it will be reserved so that another user cannot book it again 
will be used within the calendar and also within the profile hamburger menu my trips, and my reservations*/

import prisma from "@/app/libs/prismadb";

// prop are set so that the query can come from the listing, by userId to look into their trips or authorId to see if
//reservations were made on the authors property
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

// params are passed into the function and destructured into params for further use
export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    // create modified queries depending on what data we want to look up whether its listing, userId, or authorId
    const query: any = {}; //opens an empty object

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    // find all of the reservations depending on the query passed
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // need to return a SafeUser to avoid console warnings since we pass date objects
    // map function on reservation to spread the current reservation, then modify all attributes to isostring
    // then modify listing to make the created at an isostring
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.createdAt.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
