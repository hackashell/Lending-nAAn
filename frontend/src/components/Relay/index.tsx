import { ethers } from "ethers";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  MetaTransactionOptions,
} from "@safe-global/safe-core-sdk-types";
import { useEffect } from "react";
import Button from "../Button/Button";
import { useSDK } from "@metamask/sdk-react";
import { Address } from "viem";

export const Relay = () => {
  const { account } = useSDK();
  // https://chainlist.org
  const RPC_URL = "https://endpoints.omniatech.io/v1/bsc/mainnet/public";
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider);
  const safeAddress = account as Address; // Safe from which the transaction will be sent

  // Any address can be used for destination. In this example, we use vitalik.eth
  const destinationAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const withdrawAmount = ethers.parseUnits("0.005", "ether").toString();

  // Create a transactions array with one transaction object
  const transactions: MetaTransactionData[] = [
    {
      to: destinationAddress,
      data: " 0xad2e65a73b714d5c5f5a49a388023cd36e0443d",
      value: withdrawAmount,
    },
  ];
  const options: MetaTransactionOptions = {
    isSponsored: true,
  };

  const executeTxn = async () => {
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });

    const protocolKit = await Safe.create({
      ethAdapter,
      safeAddress,
    });

    const relayKit = new GelatoRelayPack({
      apiKey: process.env.GELATO_RELAY_API_KEY!,
      protocolKit,
    });

    const safeTransaction = await relayKit.createRelayedTransaction({
      transactions,
      options,
    });

    const signedSafeTransaction = await protocolKit.signTransaction(
      safeTransaction
    );

    const response = await relayKit.executeRelayTransaction(
      signedSafeTransaction
    );

    console.log(
      `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
    );
  };

  return (
    <div>
      <Button text="Execute txn" onClick={executeTxn} />
    </div>
  );
};
