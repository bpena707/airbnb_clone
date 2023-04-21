'use client'

// modals are rendered on the layout.tsx and pop up when an on click is triggered on the app

import { useCallback, useEffect, useState } from "react"
import {IoMdClose} from 'react-icons/io'
import Button from "../Button"

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    onSubmit: () => void
    title?: string
    body?: React.ReactElement
    footer?: React.ReactElement
    actionLabel: string
    disabled?: boolean
    secondaryAction?: () => void
    secondaryActionLabel?: string
}

// props are assigned here as modal props 
const Modal: React.FC<ModalProps> = ({
    // all props are extracted
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    // the default state isOpen is true for the useEffect as well
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    },[isOpen])

    // this is for the animations that will delay for 300 milisecs onclose is added so it doesn't break the animation modal
    const handleClose = useCallback(() => {
        // if midal is disabled we return so that the modal doesnt break the callback function
        if(disabled) {
            return 
        }
        // turn set show modal to false with 300ms and calls onClose to make the animations work 
        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }, [disabled, onClose])

    // submit funciton 
    const handleSubmit = useCallback(() =>{
        if (disabled) {
            return
        }
        onSubmit()
    },[disabled, onSubmit])

    // most likely be a previous and next button rather than a submit
    const handleSecondaryAction = useCallback(() => {
        // check if button disabled or doesnt have a seconday action 
        if(disabled || !secondaryAction) {
            return 
        }
        secondaryAction()
    },[disabled, secondaryAction])

    // if modal is not open just return null, this makes the screen turn gray as if modal poped up if not applied
    if (!isOpen) {
        return null
    }
    
  return (
    // empty fragment since not all of the divs are going to have the same parent
    <>
        {/* this classname styling will chage the background when the modal pops open  */}
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 ">
            {/* this div defines all of the sizes for the different size screens if in mobile it completely fills */}
            <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
                {/* content - animation will play for a duration of 300 the showModal optionals are for the animations when the user closes the window*/}
                <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    {/* this div forms the actual window which holds the content incluting the messages and buttons */}
                    <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* Header forms the top part  */}
                        <div className="flex items-center p-6 rounded-t justify-center realtive border-b-[1px]">
                            {/* this part is what is inside the actual modal the close button and title */}
                            <button 
                                onClick={handleClose}
                                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                                {title}
                            </div>
                        </div>
                        {/* BODY */}
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>
                        {/* FOOTER */}
                        <div className="flex flex-col gap-2 p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {/* only rendered if the secondaryAction and the label are present */}
                                {secondaryAction && secondaryActionLabel && (
                                    // SECONDARY ACTION BUTTON
                                    <Button
                                    outline 
                                    disabled={disabled}
                                    label={secondaryActionLabel}
                                    onClick={handleSecondaryAction}
                                    />
                                )}
                                {/* SUBMIT BUTTON */}
                                <Button 
                                    disabled={disabled}
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                />
                            </div>
                            {/* this will render the footer to the bottom of the modal  */}
                            {footer} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
    
  )
}

export default Modal