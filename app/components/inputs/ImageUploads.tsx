'use client'
import Image from 'next/image'
import { CldUploadWidget } from "next-cloudinary"
import { useCallback } from "react"
import { TbPhotoPlus } from "react-icons/tb"

//this will enable the use of any type of cloudinary file 
declare global {
    var cloudinary: any 
}

//interface props that are passed on to the component
interface ImageUploadsProps {
    onChange: (value: string) => void
    value: string 
}


const ImageUploads: React.FC<ImageUploadsProps> = ({
    onChange,
    value
}) => {
    //handleUpload uses the useCallback hook to handle any onChange as a result of the info passed in 
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    },[onChange])

  return (

    /* the upload widget appears on the modal body as a dotted border. when the user clicks on the photo plus
    button the user activates the api where they can upload images. the props in the widget are part of the cloudinary API */
    <CldUploadWidget 
        onUpload={handleUpload}
        uploadPreset="capd5znb" //the upload preset comes from the upload section within cloudinary
        options={{
            maxFiles: 1
        }}
    >
        {/* destructured open fucntion that opens the widget */}
        {({ open }) => {
            return (
                <div 
                onClick={() => open?.()} //the open executes it in case the open doesnt exist when the modal is opened
                className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                > 
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
                {value && (
                    <div className="absolute inset-0 w-full h-full">
                        <Image src={value} alt='upload' fill style={{objectFit: 'cover'}} /> //this image is required by cloudinary api
                    </div>
                )}
                </div>
            )
        }}
    </CldUploadWidget>
  )
}

export default ImageUploads
