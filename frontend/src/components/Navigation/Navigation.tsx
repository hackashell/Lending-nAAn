import Logo from "@/components/Logo/Logo";
import ButtonAnimated from "@/components/ButtonAnimated/ButtonAnimated";
import NavigationMenu from "@/components/NavigationMenu/NavigationMenu";

const Navigation = () => (
    <header>
        <div className="">
            <div className="flex items-center justify-between">
                <Logo />
                <NavigationMenu />
            </div>
        </div>
    </header>
);

export default Navigation;