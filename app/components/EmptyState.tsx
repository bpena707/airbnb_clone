/* this is the component that will appear when the category does not have any data to display to the screen  */
'use client'

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyState {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const EmptyState: React.FC<EmptyState> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters", 
    showReset
}) => {
    const router = useRouter()
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading
            center
            title={title}
            subtitle={subtitle}
        />
        {/* this div is the container for the button */}
        <div className="w-48 mt-4">
            {/* the reset button pushes the router to the homepage */}
            {showReset && (
                <Button 
                    outline
                    label="Remove all filters"
                    onClick={() => router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState