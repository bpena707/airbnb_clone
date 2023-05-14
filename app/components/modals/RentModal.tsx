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
import { latLng } from 'leaflet';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUploads from '../inputs/ImageUploads';
import  Input  from '../inputs/Input';

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

const RentModal = () => {
    const rentModal = useRentModal()
    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

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
            location: null,
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
    /* 
        each const watches for changes form the component fields and updates the FieldValues
    */
    const category = watch('category')
    const location = watch('location') //constant is assigned to CountrySelect component below 
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    //map is dynamically imported in location since ssr doesnt fully support leaflet and is rerendered every time location is changed
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

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
            //this div is for the components within the body
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Where is your place located?'
                    subtitle='Help guests find you!'
                />
                <CountrySelect 
                    value={location}
                    onChange={(value) => setCustomValue('location', value)} 
                />
                <Map 
                    center={location?.latLng}
                />

            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                title='Share some basics about your place '
                subtitle='What ammenities do you have? '
                />
                <Counter 
                    title='Guests'
                    subtitle='How many guests do yo allow'
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter 
                    title='Rooms'
                    subtitle='How many rooms do you have'
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter 
                title='Bathrooms'
                subtitle='How many bathrooms do you have'
                value={bathroomCount}
                onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    /* the image step has a heading and takes in image uploads from the user */
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div>
                <Heading 
                    title='Add a photo of your place'
                    subtitle='Show guests what your place looks like'
                />
                <ImageUploads 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />

            </div>
        )
        
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div>
                <Heading 
                    title='How would you describe your place?'
                    subtitle='Short and sweet works best!'
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
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