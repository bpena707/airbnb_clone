'use client'
/* 
toaster is foreign notification library not adjusted to next13 yet so it needs to be wrapped like below

*/
 import { Toaster } from 'react-hot-toast'
 
 function ToasterProvider() {
   return (
     <Toaster />
   )
 }
 
 export default ToasterProvider