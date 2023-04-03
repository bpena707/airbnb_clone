'use client'

//this interface allows us to pass this container onto other client components
interface ContainerProps {
    children: React.ReactNode
}

//props are assigned to this elemenet as react functional component and extract children from the props
//anything written in another component that uses the container wrapper is passed here
const Container: React.FC<ContainerProps> = ({children}) => {
    return (
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            {children}
        </div>
    )
}

export default Container