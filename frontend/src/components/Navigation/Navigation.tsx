import Logo from "@/components/Logo/Logo";
import Button from "@/components/Button/Button";
import ButtonAnimated from "@/components/ButtonAnimated/ButtonAnimated";

const Navigation = () => (
    <header>
        <div className="max-w-7xl mx-auto p-8">
            <div className="flex items-center justify-between">
                <Logo />
                <ButtonAnimated
                    text="Connect"
                    primary
                />
            </div>
        </div>
    </header>
);

export default Navigation;