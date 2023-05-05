/* 
this ts file is used to create a safe user since date cannot be passed unless it is an object to the the layout component
*/

import { User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
}

