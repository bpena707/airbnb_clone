import countries from "world-countries";

//define formated countries that are used in the select
//the countires are mapped according to their values which creates custom fields
const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}))

const useCountries = () => {
    //gets all of the formatted countries at once
    const getAll = () => formattedCountries

    // get by value looks for the formatted country in decending order until the value matches 
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    return {
        getAll,
        getByValue
    }
}

export default useCountries