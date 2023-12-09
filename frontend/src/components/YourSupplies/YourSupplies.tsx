import TokenRepay from "@/components/TokenRepay/TokenRepay";
import {DAI_LOGO, USDC_LOGO} from "@/lib/constants";

const YourSupplies = () => {
  const mockTokens = [
    {
      icon: USDC_LOGO,
      symbol: "USDC",
      supply: 1500,
    },
    {
      icon: DAI_LOGO,
      symbol: "DAI",
      supply: 600,
    }
  ]

  return (
    <div>
      <p className="text-white font-bold mb-[30px]">Your supplies</p>
      <div className="flex items-center justify-between mb-[20px]">
        <p>Asset</p>
        <p>Debt</p>
      </div>
      <div className="grid gap-[10px]">
        {
          mockTokens.map((token, i) => (
            <TokenRepay
              key={i}
              icon={token.icon}
              debt={token.supply}
              symbol={token.symbol}
            />
          ))
        }
      </div>
    </div>
  );
}

export default YourSupplies;