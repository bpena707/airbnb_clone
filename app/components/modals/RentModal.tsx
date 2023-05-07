/* the rent modal pops up when clicking on the airbnb your home button */

'use client'
import { useMemo, useState } from 'react';
import Modal from './Modal'
import useRentModal from "@/app/hooks/useRentModal";

//set of named constants 
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

// control for the steps


const RentModal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)

    // functions that go backward and forward
    function onBack()  {
        setStep((prevState) => prevState + 1 )
    }

    function onNext() {
        setStep((prevState) => prevState - 1)
    } 

    //if the action label tries to go beyond the price step it triggers the create and then next
    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step])

    // if the secondary action label tries to go back the step is returned as undefined and the returns back
    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [step])

    //body content is dynamic and based on what step we are on

  return (
    <div>
        <Modal 
            onClose={rentModal.onClose}
            isOpen={rentModal.isOpen}
            onSubmit={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} //chekc if we are on the first step and undefined if doesnt exist
            title='Airbnb your home!'
        />
    </div>
  )
}

export default RentModal