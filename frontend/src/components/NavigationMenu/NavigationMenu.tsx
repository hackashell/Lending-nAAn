import { AnimatedButton } from "@/components/AnimatedButton/AnimatedButton";
import MyAccount from "@/components/MyAccount/MyAccount";
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

const NavigationMenu = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      // @ts-expect-error
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };
  return (
    <div className="flex items-center gap-12">
      <p className="text-sm">
        <span className="mr-4">⛽</span>
        43.7 Gwei
      </p>
      {connected && account ? (
        <div className="flex items-center gap-6">
          <AnimatedButton className="h-16" text={"Swap 🔁"} onClick={() => {}} />
          <MyAccount
            className="h-16"
            address={account}
          />
        </div>
      ) : (
        <AnimatedButton text="Connect" onClick={connect} />
      )}
    </div>
  );
};

export default NavigationMenu;
