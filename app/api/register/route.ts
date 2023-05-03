// custom post rather than switch method
import prisma from "@/app/libs/prismadb";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

// post request  that takes a request of type request and is defined by tge parameters in the body
// as a json 
export async function POST(
    request :Request
) {
   const body = await request.json()
   const {
    email,
    name,
    password
   } = body

//    creates a hashed password using bcrpt and 12 as parameter to make it hashed
   const hashedPassword = await bcrypt.hash(password, 12)

//    within prisma  a new user is created using the parameters
   const user = await prisma.user.create({
    data: {
        email,
        name,
        hashedPassword
    }
   })

// returns the next response as a json user that will be used to make a new user 
   return NextResponse.json(user)
}