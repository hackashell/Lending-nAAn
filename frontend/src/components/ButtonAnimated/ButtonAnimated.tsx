const ButtonAnimated = ({text, onClick, className}) => (
    <button onClick={onClick} className={`${className} text-sm buttonLightshow px-10 py-5 text-white bg-[#222222] rounded-lg flex items-center justify-center hover:cursor-pointer`}>
        {text}
    </button>
);

export default ButtonAnimated;