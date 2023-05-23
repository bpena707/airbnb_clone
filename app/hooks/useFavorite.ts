/* this hook file provides the capability for the user to like a listingCard using the heart icon 
the parameters passed are the listingId to identify which data in the list to favorite and currentUser to check if a user is logged in
the function has mouse detection and a try/catch block which deletes or post event based on the current state of the heart
useCallback is used to memoize the whole function since the useFavorite hook used in HeartButton depends on it. 
*/

import axios from 'axios'
import { SafeUser } from '../types'
import useLoginModal from './useLoginModal'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

interface IUseFavorite {
    listingId: string
    currentUser?: SafeUser | null
}

// the use favorite function takes in listingId and currentUser as parameters from the above interface
const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavorited = useMemo(() =>{
        // first get the list or if there is no current user give an empty array to avoid error
        const list = currentUser?.favoriteIds || []

        // return the listingId from the list array checked by the includes method
        return list.includes(listingId)
    },[currentUser, listingId])

    // this is the toggle async function with useCallback. has mouse event parameter.
    //if we are not logged in and try to like something the login modal will open instead otherwise try and catch
    const toggleFavorite = useCallback(async(
        e: React.MouseEvent<HTMLDivElement>
    )=> {
        e.stopPropagation()

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }else{
                request = () => axios.post(`/api/favorites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong')
        }

    },[currentUser, hasFavorited, listingId, loginModal, router])

    return { hasFavorited, toggleFavorite }
}

export default useFavorite