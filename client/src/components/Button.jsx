const Button = ({ type, onClick, children, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 bg-primary text-white hover:bg-white hover:text-primary outline  hover:outline-primary font-semibold rounded-md transition-all duration-200 ${className}`}
        >
            {children}
        </button>
    )
}
  
  export default Button