import { AnimatedButton } from "@/components/AnimatedButton/AnimatedButton";
import MyAccount from "@/components/MyAccount/MyAccount";
import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../Spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SwapModal from "@/components/SwapModal/SwapModal";

const NavigationMenu = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [gasData, setGasData] = useState<string>();
  const [safeChainId, setSafeChainId] = useState<string>();
  const [balance, setBalance] = useState<string>();

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

  // useEffect(() => {
  //   (async () => {
  //     const safeAuthInitOptions: SafeAuthInitOptions = {
  //       enableLogging: true,
  //       showWidgetButton: false,
  //       chainConfig: {
  //         chainId: '0xaa36a7',
  //         rpcTarget: `https://rpc.sepolia.org	`
  //       },
  //     }
  //      const safeAuthPack = new SafeAuthPack()
  //     await safeAuthPack.init(safeAuthInitOptions);
  //     setSafeAuthKit(safeAuthPack)
  //   })();
  // }, []);

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
          <SwapModal />
          <MyAccount className="h-16" address={account} />
        </div>
      ) : (
        <Dialog>
          <DialogTrigger>
            <AnimatedButton text="Connect Wallet" onClick={() => {}} />
          </DialogTrigger>
          <DialogContent className="bg-[#181818] border-0">
            <DialogHeader className="p-2">
              <DialogTitle className="text-lg my-1">
                Choose Wallet of your choice.
              </DialogTitle>
              <DialogDescription className="py-2">
                <div className="flex flex-col gap-4">
                  <AnimatedButton
                    text="Connect with Metamask"
                    onClick={connect}
                    className="w-2/3 m-auto h-12 text-base"
                  />
                  <AnimatedButton
                    text="Login with Safe"
                    onClick={() => {}}
                    className="w-2/3 m-auto h-12 text-base"
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NavigationMenu;
