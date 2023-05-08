'use client'
import useCountries from '@/app/hooks/UseCountries'
import React from 'react'
import Select from 'react-select'

export type CountrySelectValue = {
    flag: string
    label: string 
    latlng: number[]
    region: string
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue
    onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {

    const { getAll } = useCountries() //use this to fetch all countries

  return (
    <div>
        <Select 
            placeholder='Anywhere'
            isClearable
            options={getAll()} //all options displayed using the getAll from use countries hook 
            onChange={(value) => onChange(value as CountrySelectValue)}
        />
    </div>
  )
}

export default CountrySelect
