import Logo from "@/components/Logo/Logo";
import dynamic from "next/dynamic";
const NavigationMenu = dynamic(() => import("@/components/NavigationMenu/NavigationMenu"), {
    ssr: false,
})

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