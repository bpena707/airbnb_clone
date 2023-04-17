'use client' 

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from "react-icons/fc";

import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useState } from 'react';
import Modal from './Modal';

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    // pass data to axios as a field value which is the name email and password 
    const onSubmit: SubmitHandler<FieldValues> = (data => {
        setIsLoading(true)

        // axios post call 
        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose() //for the the data is successfully registered
        })
        .catch ((error) => {
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false)
        }) //turn off loading when done by changing the state to false 
    })

  return (
    <Modal 
        disabled={isLoading} //user cannot submit anything while the modal is loading 
        isOpen={registerModal.isOpen} //comes from the hook useRegisterModal which is defined with options useRegisterModal file
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal