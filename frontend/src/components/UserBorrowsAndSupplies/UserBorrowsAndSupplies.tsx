import YourBorrows from "@/components/YourBorrows/YourBorrows";
import YourSupplies from "@/components/YourSupplies/YourSupplies";
import { bundlerClient, paymasterClient, publicClient } from "@/pimlicoConfig";
import { useSDK } from "@metamask/sdk-react";
import { createSmartAccountClient , } from "permissionless";

import { Address, http, parseEther } from "viem";
import {  arbitrumGoerli,  } from "viem/chains";
import { Alert } from "../Alert";

const UserBorrowsAndSupplies = () => {
  const { account} = useSDK()
  const executeTxn = async () => {

    const smartAccountClient = createSmartAccountClient({
      account: account as Address,
      chain: arbitrumGoerli,
      transport: http(
        "https://api.pimlico.io/v1/CHAIN/rpc?apikey=" + process.env.NEXT_PUBLIC_PIMLICO_API_KEY,
      ),
      sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
    });
    
    const gasPrices = await bundlerClient.getUserOperationGasPrice();

    const txHash = await smartAccountClient.sendTransaction({
      to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      account: account as Address,
      value: parseEther("0.1"),
      maxFeePerGas: gasPrices.fast.maxFeePerGas, // if using Pimlico
      maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas, // if using Pimlico
    });

    console.log(txHash);
    <Alert message="Txn sent!" />
  };
  return (
    <div className="grid grid-cols-2 gap-10 mx-auto w-4/5">
      <YourBorrows />
      <YourSupplies />
    </div>
  );
};

export default UserBorrowsAndSupplies;
