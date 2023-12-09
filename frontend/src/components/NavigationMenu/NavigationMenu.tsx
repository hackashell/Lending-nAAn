import { AnimatedButton } from "@/components/AnimatedButton/AnimatedButton";
import MyAccount from "@/components/MyAccount/MyAccount";
import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../Spinner";

const NavigationMenu = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [gasData, setGasData] = useState<string>();

  const Auth = Buffer.from(
    process.env.NEXT_PUBLIC_INFURA_API_KEY +
      ":" +
      process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET
  ).toString("base64");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://gas.api.infura.io/networks/1/suggestedGasFees`,
          {
            headers: {
              Authorization: `Basic ${Auth}`,
            },
          }
        );
        console.log("Suggested gas fees:", data?.medium?.suggestedMaxFeePerGas);
        setGasData(parseFloat(data?.medium?.suggestedMaxFeePerGas).toFixed(2));
      } catch (error) {
        console.log("Server responded with:", error);
      }
    })();
  }, [Auth, chainId]);

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
      <div className="text-sm flex items-center gap-[3px]">
        <span className="mr-2">⛽</span>
        <div className="w-[40px]">
          {gasData ? <p>{gasData}</p> : <Spinner className="w-[15px] h-[15px] mx-auto" />}
        </div>
        Gwei
      </div>
      {connected && account ? (
        <div className="flex items-center gap-6">
          <AnimatedButton
            className="h-16"
            text={"Swap 🔁"}
            onClick={() => {}}
          />
          <MyAccount className="h-16" address={account} />
        </div>
      ) : (
        <AnimatedButton text="Connect" onClick={connect} />
      )}
    </div>
  );
};

export default NavigationMenu;
