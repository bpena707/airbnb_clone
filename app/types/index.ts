/* 
this ts file is used to create a safe user since date cannot be passed unless it is an object to the the layout component
*/

import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string //replaces the createdAt with a string to avoid the console warning
}

export type safeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string
    startDate: string
    endDate: string
    listing: SafeListing
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}

