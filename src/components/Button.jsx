function Button({
    children,
    type='button',
    bgColor ='bg-blue-600',
    textColor='text-white',
    classname='',
    className='',
    ...props
}){
    return(
        <>
        <button className={`px-5 py-2.5 rounded-full font-semibold shadow-sm hover:-translate-y-0.5 hover:shadow-md ${classname} ${className} ${bgColor} ${textColor}`} {...props}
        type={type}>{children}</button>
        </>
    )
}
export default Button
