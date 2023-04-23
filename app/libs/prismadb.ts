/* this file will be to create types for prisma  */

import { PrismaClient } from '@prisma/client'

//global definition of prisma to work throughout the code
declare global {
    var prisma: PrismaClient | undefined
}

//const client that searches for teh gloabal prisma or creats a new prisma client
const client = global.globalThis.prisma || new PrismaClient()
//check to make sure we are not in development to set the prisma client to the newly created client 
// avoids problems with hot reload
if (process.env.NODE_ENV != 'production') globalThis.prisma = client 

export default client
    
