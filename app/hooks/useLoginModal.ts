// this is for the zustand api 

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