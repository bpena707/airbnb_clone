// this is for the zustand api 
/* 
this hook will control whether the application is open or closed via the onOpen and onClose functions
the default is set to false so that the modal is closed until the user clicks on the login modal 
*/

import { create } from "zustand";


interface LoginModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// extract the set property as an object 
const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useLoginModal