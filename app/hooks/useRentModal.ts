// this is for the zustand api 
/* 
this hook will control whether the application is open or closed via the onOpen and onClose functions
the default is set to false 
*/

import { create } from "zustand";


interface RentModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// extract the set property as an object 
const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useRentModal