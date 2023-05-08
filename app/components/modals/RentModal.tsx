/* the rent modal pops up when clicking on the airbnb your home button */

'use client'
import { useMemo, useState } from 'react';
import Modal from './Modal'
import useRentModal from "@/app/hooks/useRentModal";
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';

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

    //body content is dynamic and based on what step we are let since its a changeable variable 
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
                title='Which best decribes your place'
                subtitle='Pick a category' 
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {/* categories are maped to the their label which display the objects with their label  */}
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            onClick={() => {}}
                            selected={false}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

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
            body={bodyContent}
        />
    </div>
  )
}

export default RentModal