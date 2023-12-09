import YourBorrows from "@/components/YourBorrows/YourBorrows";
import YourSupplies from "@/components/YourSupplies/YourSupplies";
import { bundlerClient, paymasterClient, publicClient } from "@/pimlicoConfig";
import { useSDK } from "@metamask/sdk-react";
import { createSmartAccountClient , } from "permissionless";
import OvenABI from "../../../../backend/out/Oven.sol/Oven.json"
import { Address, concat, encodeFunctionData, http, parseEther } from "viem";
import {  arbitrumGoerli,  } from "viem/chains";
import { Alert } from "../Alert";

const UserBorrowsAndSupplies = () => {
  const { account} = useSDK()

  // GENERATE THE INITCODE
const SIMPLE_ACCOUNT_FACTORY_ADDRESS = "0xad2e65a73b714d5c5f5a49a388023cd36e0443db"
 
const initCode = concat([
  SIMPLE_ACCOUNT_FACTORY_ADDRESS,
  encodeFunctionData({
    abi: [{
      inputs: [{ name: "owner", type: "address" }, { name: "salt", type: "uint256" }],
      name: "createAccount",
      outputs: [{ name: "ret", type: "address" }],
      stateMutability: "nonpayable",
      type: "function",
    }],
    args: [account as Address, BigInt('0n')],
  })
]);
 
console.log("Generated initCode:", initCode)
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
      to: "0xad2e65a73b714d5c5f5a49a388023cd36e0443db",
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
