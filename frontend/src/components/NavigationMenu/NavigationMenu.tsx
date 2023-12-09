"use client";

import { AnimatedButton } from "@/components/AnimatedButton/AnimatedButton";
import { BrowserProvider, Eip1193Provider, ethers } from "ethers";
import MyAccount from "@/components/MyAccount/MyAccount";
import { useSDK } from "@metamask/sdk-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../Spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
// import { safeAuthInitOptions, safeAuthPack } from "../../../safeConfig";
import {
  AuthKitSignInData,
  SafeAuthInitOptions,
  SafeAuthPack,
  SafeAuthUserInfo,
} from "@safe-global/auth-kit";
import { Button } from "../ui/button";
import SwapModal from "@/components/SwapModal/SwapModal";

const NavigationMenu = () => {
  const { account, sdk, connected, connecting, provider, chainId } = useSDK();
  const [gasData, setGasData] = useState<string>();
  const [safeAuthPack, setSafeAuthPack] = useState<SafeAuthPack>();
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
    useState<AuthKitSignInData>();
  const [modal, setModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!safeAuthPack?.isAuthenticated
  );
  const [safeProvider, setSafeProvider] = useState<BrowserProvider>();

  const [userInfo, setUserInfo] = useState<SafeAuthUserInfo | null>(null);
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
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  useEffect(() => {
    (async () => {
      const safeAuthInitOptions: SafeAuthInitOptions = {
        enableLogging: true,
        showWidgetButton: false,
        chainConfig: {
          chainId: "421613",
          rpcTarget: `https://goerli-rollup.arbitrum.io/rpc`,
        },
      };
      const safeAuthPack = new SafeAuthPack();
      await safeAuthPack.init(safeAuthInitOptions);
      setSafeAuthPack(safeAuthPack);
    })();
  }, []);

  useEffect(() => {
    // @ts-expect-error - Missing globals
    const params = new URL(window.document.location).searchParams;
    const chainId = params.get("chainId");

    (async () => {
      const options: SafeAuthInitOptions = {
        enableLogging: true,
        buildEnv: "production",
        chainConfig: {
          chainId: "0xaa36a7",
          rpcTarget: `https://rpc.sepolia.org	`,
        },
        showWidgetButton: true,
      };

      const authPack = new SafeAuthPack();

      await authPack.init(options);

      console.log("safeAuthPack:safeEmbed", authPack.safeAuthEmbed);

      setSafeAuthPack(authPack);

      authPack.subscribe("accountsChanged", async (accounts) => {
        console.log(
          "safeAuthPack:accountsChanged",
          accounts,
          authPack.isAuthenticated
        );
        if (authPack.isAuthenticated) {
          const signInInfo = await authPack?.signIn();

          setSafeAuthSignInResponse(signInInfo);
          setIsAuthenticated(true);
        }
      });

      authPack.subscribe("chainChanged", (eventData) =>
        console.log("safeAuthPack:chainChanged", eventData)
      );
    })();
  }, []);

  useEffect(() => {
    if (!safeAuthPack || !isAuthenticated) return;
    (async () => {
      const web3Provider = safeAuthPack.getProvider();
      const userInfo = await safeAuthPack.getUserInfo();

      setUserInfo(userInfo);

      if (web3Provider) {
        const provider = new BrowserProvider(
          safeAuthPack.getProvider() as Eip1193Provider
        );
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();

        setSafeChainId((await provider?.getNetwork()).chainId.toString());
        setBalance(
          ethers.formatEther(
            (await provider.getBalance(signerAddress)) as ethers.BigNumberish
          )
        );
        setSafeProvider(provider);
      }
    })();
  }, [isAuthenticated]);

  const loginWIthSafe = async () => {
    setModal(false);
    const signInInfo = await safeAuthPack?.signIn();

    setSafeAuthSignInResponse(signInInfo);
    setIsAuthenticated(true);
    console.log("Sign In Info", signInInfo);
  };

  const logout = async () => {
    await safeAuthPack?.signOut();

    setSafeAuthSignInResponse(undefined);
  };

  const getUserInfo = async () => {
    const userInfo = await safeAuthPack?.getUserInfo();

    console.log("User Info", userInfo);
  };

  const getAccounts = async () => {
    const accounts = await provider?.send("eth_accounts", []);

    console.log("Accounts", accounts);
  };

  return (
    <div className="flex items-center gap-12">
      <div className="text-sm flex items-center gap-[3px]">
        <span className="mr-2">⛽</span>
        <div className="w-[40px]">
          {gasData ? (
            <p>{gasData}</p>
          ) : (
            <Spinner className="w-[15px] h-[15px] mx-auto" />
          )}
        </div>
        Gwei
      </div>
      {connected && account ? (
        <div className="flex items-center gap-6">
          <SwapModal />
          <MyAccount className="h-16" address={account} />
        </div>
      ) : (
        <Dialog open={modal} onOpenChange={setModal}>
          <DialogTrigger>
            <AnimatedButton
              text="Sign in"
              onClick={() => {
                setModal(true);
              }}
            />
          </DialogTrigger>
          <DialogContent>
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
                    onClick={loginWIthSafe}
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
