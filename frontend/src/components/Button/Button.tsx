interface Props {
  text: string;
  onClick: () => void;
  className?: string;
  primary?: boolean;
}

const Button: React.FC<Props> = ({
  text,
  onClick,
  primary = false,
  className,
}) => (
  <button
    onClick={onClick}
    className={`${className} text-sm px-10 py-5 text-white hover:opacity-90 ${
      primary ? "bg-[--primary-color]" : "bg-[#222222]"
    } border ${
      primary ? "border-[--primary-color]" : "border-[#222222]"
    } rounded-lg flex items-center justify-center hover:cursor-pointer`}
  >
    {text}
  </button>
);

export default Button;
