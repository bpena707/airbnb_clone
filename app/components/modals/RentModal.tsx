/* the rent modal pops up when clicking on the airbnb your home button */

'use client'
import { useMemo, useState } from 'react';
import Modal from './Modal'
import useRentModal from "@/app/hooks/useRentModal";
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValue, FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';

//set of named constants that compromise of the steps if the airbnb your home modal.
//user will go through steps chronologically by clicking next 
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
    //used to connect to the form
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
        // this form is used to build upon the listing schema in prisma default values are named the same as values in schema
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location:'',
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    // since category input is implemented use the watch function to watch the category value
    const category = watch('category')

    // custom set value to rerender the page derived from the setValue field value
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true

        })
    }

    // functions that go backward and forward
    const onBack = () =>  {
        setStep((prevState) => prevState - 1 )
    }

    const onNext = () => {
        setStep((prevState) => prevState + 1)
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
                            onClick={(category) => setCustomValue('category', category)} //this will keep the box highlighted when clicked on using the accepted id of category
                            selected={category === item.label} //category comes from the watch category. 
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div>
                <Heading 
                    title='Where is your place located'
                    subtitle='Help guests find you!'
                />
                <CountrySelect onChange={() => {}} />

            </div>
        )
    }

 

  return (
    <div>
        <Modal 
            onClose={rentModal.onClose}
            isOpen={rentModal.isOpen}
            onSubmit={onNext}
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