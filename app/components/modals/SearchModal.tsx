'use client'

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import { Range } from "react-date-range"
import qs from 'query-string'
import { formatISO } from "date-fns"
import Heading from "../Heading"
import Calendar from "../inputs/Calendar"
import Counter from "../inputs/Counter"

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}


const SearchModal = () => {
    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal()

    // the following are all of the states that will change as the user moves through the steps
    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestRoomCount, setGuestRoomCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathRoomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    // this dynamically renders the map 
    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }),[location])

    // the following 2 functions are for the next and back functionality in the modal
     const onBack = useCallback(() => {
        setStep((value) => value -1)
     },[])

     const onNext = useCallback(() => {
        setStep((value) => value + 1)
     },[])

     const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext()
        }

        // the current query is set to an empty object when starting off
        let currentQuery = {}

        // if params are found currentQuery is set to the parsed param as a string 
        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        // checks for the updated query by spearding the currentQuery and looking at other queries
        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestRoomCount,
            roomCount,
            bathRoomCount
        }

        // the following if statements formate the start and end dates to iso string since they go into url which updates the server component
        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        // this creates the final query for the url 
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        // resets the step and pushes the url to the router
        setStep(STEPS.LOCATION)
        searchModal.onClose()

        router.push(url)
     },[step, searchModal, location, router, guestRoomCount, roomCount, bathRoomCount, dateRange, onNext, params])

    //  action labels for the next and back button
     const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }
        
        return 'Next'
     },[step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    },[step])


    // the following body content holds all of the modals for the steps the user will go through to filter and seach for bookings. 
    let bodyContent = (
        <div>
            <Heading 
                title="Where do you wann go?"
                subtitle="Find the perfect location"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )
    
    if (step === STEPS.DATE) {
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />

                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>

        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter 
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestRoomCount}
                    onChange={(value) => setGuestRoomCount(value)}
                />
                <Counter 
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setGuestRoomCount(value)}
                />
                <Counter 
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathRoomCount}
                    onChange={(value) => setGuestRoomCount(value)}
                />
            </div>
        )
    }

  return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel} // pulled from the function above
        body={bodyContent}
    />
  )
}

export default SearchModal