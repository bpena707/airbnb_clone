'use client' 

/*
The RegisterModal is a modal that is responsible for handling the Registration of a new user.
The main styling is handled by the modal component which is imported and rendered in the return.
The useRegisterModal custom hook that was created in a separate file is also used here to handle data values that are passed
as field values in to the submission handler which takes the data and creates a post via axios along with all of the edge cases
the body content is added to the body of the modal as a prop
*/

// axios is a data fetching library 
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc";

// these are all of the imports that are going to be used from hook form 
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal';

import { MouseEvent, useCallback, useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from "../inputs/Input";
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    // variable for the useRegisterModal file that will be used in this component 
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    // this function is for the form control the useForm that acceots the field values 
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        // object of defualt field values
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    // pass data to axios as a field value which is the name email and password 
    // onSubmit is a type of SubmitHandler which takes in FieldValues in the same way the useForm takes them 
    // accepts data. the set is loading is set to true so that the animation loads up 
    const onSubmit: SubmitHandler<FieldValues> = (data => {
        setIsLoading(true)

        // axios post call to the register end point and sends data which is safely passed as field values
        axios.post('/api/register', data)
        .then(() => {
            toast.success('Success')
            registerModal.onClose() //close the register modal when the the data is successfully registered
            loginModal.onOpen()
        })
        // hot toast error appears 
        .catch ((error) => {
            toast.error("Something went wrong") 
        })
        .finally(() => {
            setIsLoading(false)
        }) //turn off loading when done by changing the state to false 
    })

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal, registerModal])

    //this is a body content that can be passed to modal based on the useRegisterModal hook which is an optional prop
    // passes the heading component
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome to Airbnb' 
                subtitle='create an account!'
            />
            {/* these are the different input fields for email, name and password boxes that pop up on the register modal which the user can sign up on  */}
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    // the footer content goes under the continue button in the register modal and has all teh buttons for logging in with 
    // google or github
    const footerContent = (
        // this dice is the outer part that places the gap from the body and makes everything inside flex
        <div className='flex flex-col gap-4 mt-3 '>
            <hr />
            <Button outline label='Continue with Google' onClick={() => signIn('google')} icon={FcGoogle} />
            <Button outline label='Continue with Github' onClick={() => signIn('github')} icon={AiFillGithub} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline '>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading} //user cannot submit anything while the modal is loading 
        isOpen={registerModal.isOpen} //comes from the hook useRegisterModal which is defined with option isOpen useRegisterModal file
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose} //also comes from the useRegisterModal file as a hook that closes the window 
        onSubmit={handleSubmit(onSubmit)}//onSubmit is wrapped in the handleSubmit function which takes care of data hanling and posting 
        body={bodyContent} //this prop is for rending the content to the window. 
        footer={footerContent} //prop renders footer to the window
    />
  )
}

export default RegisterModal