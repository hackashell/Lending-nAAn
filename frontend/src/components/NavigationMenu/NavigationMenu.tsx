import ButtonAnimated from "@/components/ButtonAnimated/ButtonAnimated";
import MyAccount from "@/components/MyAccount/MyAccount";

const NavigationMenu = () => {
    const isConnected = true;
    return (
        <div className="flex items-center gap-12">
            <p className="text-sm">
                <span className="mr-4">⛽</span>
                43.7 Gwei
            </p>
            {
                isConnected ?
                    (
                        <div className="flex items-center gap-6">
                            <ButtonAnimated
                                className="h-16"
                                text={"Swap 🔁"}
                                primary
                            />
                            <MyAccount
                                className="h-16"
                                address={"0xE0fF737685fdE7Fd0933Fc280D53978b3d0700D5"}
                            />
                        </div>
                    ) :
                    <ButtonAnimated
                        text="Connect"
                        primary
                    />
            }

        </div>
    )
};

export default NavigationMenu;