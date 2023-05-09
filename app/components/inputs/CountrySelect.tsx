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
            onChange={(value) => onChange(value as CountrySelectValue)} //call the prop on change and calls the value as country select
            formatOptionLabel={(option: any) => (
                <div className='flex flex-row items-center gap-3'>
                    <div>{option.flag}</div>
                    <div>
                        {option.label}, <span className='text-neutral-500 ml-1'>{option.region}</span>
                    </div>

                </div>
            )}
            //these are the classnames that format thb select box to match the theme 
            classNames={{
                control: () =>'p-3 border-2', //thickness of border 
                input: () => 'text-lg', 
                option: () =>'text-lg' //text within the select 
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6, //border radius of the bar 
                colors: {
                    ...theme.colors,
                    primary: 'black', //this the color of the border
                    primary25: '#ffe4e6' //this is the highlighted bar in select
                }
            })}
        />
    </div>
  )
}

export default CountrySelect
