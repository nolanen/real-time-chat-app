const Input = ({type, name, placeholder, value, onChange, className}) => {
    return (
        <>
            <label htmlFor={name} className="block">
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`py-2 px-3 w-full border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${className}`}
            />
        </>
    )
}

export default Input