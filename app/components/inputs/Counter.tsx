'use client'

import React, { useCallback } from "react"


interface CounterProps {
    title: string
    subtitle: string
    value: number
    onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {
    /* 
        these functions are all useCallback functions to prevent unnessesary re-rendering whenever the user 
        updates the values, the dependencies in the brackets cause the change to occur.
    */
    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

    const onReduce =useCallback(() => {
        if (value === 1) {
            return
        }

        onChange(value - 1)
    }, [value, onChange])
  return (
    <div>
        <div>
            {title}
        </div>
    </div>
  )
}

export default Counter
