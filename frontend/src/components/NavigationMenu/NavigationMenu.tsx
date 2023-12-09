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
                                address={"someadress"}
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