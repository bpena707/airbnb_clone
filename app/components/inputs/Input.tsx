/* 
this component is responsible for interfacing the props of the input box that appears in any modal. it uses the 
react-hook-form functionality to gather field values and handle errors.
this component also styles the input that appears in the modal 
*/

import React from "react"
import { FieldErrors, FieldValue, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"

interface InputProps {
    id: string
    label: string
    type?: string
    disabled?: boolean
    formatPrice?: boolean
    required?: boolean
    // not the same as the register we use for submission but rather from react-hook-form
    register: UseFormRegister<FieldValues> 
    errors: FieldErrors //used to store validation errors when user interacts with the field which will be defined in this component

}

const Input:React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors
}) => {
  return (
    <div className="w-full relative">
        {/* this is a conditional for the price to show up when it is used */}
        {formatPrice && (
            <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2"/>
        )}
        {/* spread the register function which was passed and then pass in the id and the required oject  
            errors turn the box red
        */}
        <input id={id} disabled={disabled} {... register(id, {required})} placeholder=" " type={type} 
            className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
                        ${formatPrice ? 'pl-9' : 'pl-4'}
                        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} 
                        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
            `} //this styles the actual input field
        />
        {/* the label  peer controls what happens during different events. peer from before was the parent element */}
        <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-center ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-rose-500' : 'text-zinc-400' }`} >
            {label}
        </label>
    </div>
  )
}

export default Input