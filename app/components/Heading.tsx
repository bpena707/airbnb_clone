'use client'
/* 
This heading component sets the props that will be passed into other components which includes the title and the other optional subtitle and center 
the styling for the text is donw here and passes the title and subtitle as a prop
this can be used in the body of any modal 
*/

interface HeadingProps {
    title: string,
    subtitle?: string,
    center?: boolean
}

// props assigned here and extracted 
const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
  return (
    // if centered it centers the text if not the text is on the left start side 
    <div className={center ? 'text-center' : 'text-start'}> 
        <div className="text-2xl font-bold">
            {title}
        </div>
        <div className="font-light text-neutral-500 mt-2">
            {subtitle}
        </div>
    </div>
  )
}

export default Heading