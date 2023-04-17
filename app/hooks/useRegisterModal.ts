// this is for the zustand api 

import { create } from "zustand";


interface RegisterModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// extract the set property as an object 
const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useRegisterModal