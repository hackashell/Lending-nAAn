import { AnimatedButton } from "../AnimatedButton/AnimatedButton";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {DAI_LOGO, ETH_LOGO, USDC_LOGO} from "@/lib/constants";
import {useSDK} from "@metamask/sdk-react";
import { bundlerClient, paymasterClient, publicClient } from "@/pimlicoConfig";
import { createSmartAccountClient , } from "permissionless";
import OvenABI from "../../../../backend/out/Oven.sol/Oven.json"
import { Address, concat, encodeFunctionData, http, parseEther } from "viem";
import {  arbitrumGoerli,  } from "viem/chains";
import { Alert } from "../Alert";

const TokenOptions = () => (
  <>
    <SelectItem value="eth">
      <div className="flex items-center gap-[10px] py-[5px]">
        <img className="w-[30px] rounded-full" src={ETH_LOGO} alt="DAI_LOGO" />
        <p>ETH</p>
      </div>
    </SelectItem>
    <SelectItem value="usdc">
      <div className="flex items-center gap-[10px] py-[5px]">
        <img className="w-[30px] rounded-full" src={USDC_LOGO} alt="USDC logo" />
        <p>USDC</p>
      </div>
    </SelectItem>
    <SelectItem value="dai">
      <div className="flex items-center gap-[10px] py-[5px]">
        <img className="w-[30px] rounded-full" src={DAI_LOGO} alt="DAI_LOGO" />
        <p>DAI</p>
      </div>
    </SelectItem>
  </>
)

export const BorrowSupply = () => {
  const { account, connected, sdk } = useSDK();

  // GENERATE THE INITCODE
const SIMPLE_ACCOUNT_FACTORY_ADDRESS = "0xad2e65a73b714d5c5f5a49a388023cd36e0443db"
 
  const executeTxn = async () => {

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
    <div className="bg-compBg my-10 mx-auto flex flex-col gap-3 w-4/5 p-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-white font-semibold text-lg">Deposit</div>
        <div className="text-white font-semibold text-lg">Borrow</div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 rounded-md">
        <Input
          className="bg-inputBg rounded-sm text-white text-4xl h-16 p-2 border-0 focus:border-0 active:border-0 focus:ring-0 focus:outline-0 placeholder:text-[#595959]"
          type="number"
          placeholder="0"
        />
        <div
          className="text-[#595959] text-4xl h-16 flex items-center px-2"
        >
          0
        </div>
        <Select>
          <SelectTrigger className="w-auto border-0 focus:ring-offset-0 bg-inputBg rounded-md h-16">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent className="bg-inputBg text-lg border-0 focus:border-0 active:border-0 text-white">
            <TokenOptions />
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-auto border-0 active:border-0 focus:border-0 focus:ring-offset-0 bg-inputBg rounded-md h-16">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent className="bg-inputBg text-lg focus:ring-offset-0 border-0 active:border-0 focus:border-0 text-white">
            <TokenOptions />
          </SelectContent>
        </Select>
      </div>
      {
        account && connected ?
          <AnimatedButton
            className="w-full text-lg"
            text="Execute" onClick={() => {}}
          /> :
          <AnimatedButton
            className="w-full text-lg"
            // TODO: open modal instead of MetaMask
            text="Connect" onClick={() => sdk?.connect()}
          />
      }

    </div>
  );
};
