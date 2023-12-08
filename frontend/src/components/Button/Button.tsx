const Button = ({text, onClick, primary, className}) => (
    <button
        onClick={onClick}
        className={`${className} text-sm px-10 py-5 text-white hover:opacity-90 ${primary ? "bg-[--primary-color]" : "bg-[#222222]"} border ${primary ? "border-[--primary-color]" : "border-[#222222]"} rounded-lg flex items-center justify-center hover:cursor-pointer`}
    >
        {text}
    </button>
);

export default Button;