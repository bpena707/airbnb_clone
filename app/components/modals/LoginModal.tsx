'use client' 

/*
The login modal 
*/

// using the sign in fucntion from next auth to validate the user is signing into the account 
import { signIn } from "next-auth/react";
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

import { MouseEvent, useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from "../inputs/Input";
import { toast } from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from "next/navigation";

const LoginModal = () => {
    // variable for the useRegisterModal file that will be used in this component and the login modal that is added 
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // this function is for the form control the useForm that acceots the field values 
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        // object of defualt field values
        defaultValues: {
            email: '',
            password: ''
        }
    })

    /* 
        signing in using credential based on the data that is passed into the onSubmit. the credentials 
        come from the [...nextauth].ts file where it requires the name and password
    */
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ... data,
            redirect: false
        })
        .then((callback) => {
            setIsLoading(false)

            //if the callback worked and we successfully logged in we call toast success
            //router updates all active values and then closes the modal  
            if (callback?.ok) {
                toast.success('Logged in')
                router.refresh() 
                loginModal.onClose()
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    //this is a body content that can be passed to modal based on the useLoginModal hook which is an optional prop
    // passes the heading component
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
                title='Welcome back' 
                subtitle='Login to your account!'
            />
            {/* these are the different input fields for email, name and password boxes that pop up on the register modal which the user can sign up on  */}
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
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
                    <div onClick={registerModal.onClose} className='text-neutral-800 cursor-pointer hover:underline '>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading} //user cannot submit anything while the modal is loading 
        isOpen={loginModal.isOpen} //comes from the hook useRegisterModal which is defined with option isOpen useRegisterModal file
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose} //also comes from the useRegisterModal file as a hook that closes the window 
        onSubmit={handleSubmit(onSubmit)}//onSubmit is wrapped in the handleSubmit function which takes care of data hanling and posting 
        body={bodyContent} //this prop is for rending the content to the window. 
        footer={footerContent} //prop renders footer to the window
    />
  )
}

export default LoginModal