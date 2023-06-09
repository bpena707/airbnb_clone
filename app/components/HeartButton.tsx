/* this component holds the heart icon that toggles when clicked on */
'use client'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { SafeUser } from "../types"
import useFavorite from "../hooks/useFavorite"

interface HeartButtonProps {
    listingId: string
    currentUser?: SafeUser | null

}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    // the useFavorite hook is passed with the destructured parameters 
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser
    })
    
  return (
    <div
        onClick={toggleFavorite}
        className="relative hover:opacity-80 transition cursor-pointer"
    >
        {/* these two icons overlay eachother because of their position being set within the ListingCard component are toggled */}
        <AiOutlineHeart size={28} className="fill-white absolute -top[2px] -right-[2px]" />
        <AiFillHeart size={24} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}/>
    </div>
  )
}

export default HeartButton