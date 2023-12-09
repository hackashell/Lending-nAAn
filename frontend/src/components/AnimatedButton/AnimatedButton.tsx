interface Props {
  text: string;
  onClick: () => void;
  className?: string;
}

export const AnimatedButton: React.FC<Props> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} text-sm buttonLightshow px-10 py-5 text-white bg-[#222222] rounded-lg flex items-center justify-center hover:cursor-pointer`}
    >
      {text}
    </button>
  );
};
