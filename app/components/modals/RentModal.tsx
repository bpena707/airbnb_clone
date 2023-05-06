/* the rent modal pops up when clicking on the airbnb your home button */

'use client'
import Modal from './Modal'
import useRentModal from "@/app/hooks/useRentModal";



const RentModal = () => {
    const rentModal = useRentModal()

  return (
    <div>
        <Modal 
            onClose={rentModal.onClose}
            isOpen={rentModal.isOpen}
            onSubmit={rentModal.onClose}
            actionLabel='Submit'
            title='Airbnb your home!'
        />
    </div>
  )
}

export default RentModal