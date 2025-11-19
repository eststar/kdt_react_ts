interface TailInputProps {
    placeholder : string, 
    type : string, 
    name : string, 
    ref : React.RefObject<HTMLInputElement>
}

export default function TailInput({ placeholder, type, name, ref } : TailInputProps) {
    return (
        <input placeholder={placeholder} type={type} name={name} ref={ref}
            className="w-full border-2 border-solid border-gray-500 p-2 text-base focus:ring-indigo-500 focus:border-indigo-500" />
    )
}
