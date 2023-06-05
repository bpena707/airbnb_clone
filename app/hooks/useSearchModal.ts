// this is for the zustand api 
/* 

*/

import { create } from "zustand";


interface SearchModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

// extract the set property as an object 
const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))

export default useSearchModal