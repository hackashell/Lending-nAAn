import TokenWithdraw from "@/components/TokenWithdraw/TokenWithdraw";
import {DAI_LOGO, USDC_LOGO} from "@/lib/constants";

const YourBorrows = () => {
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
      <p className="text-white font-bold mb-[30px]">Your Borrows</p>
      <div className="flex items-center justify-between mb-[20px]">
        <p>Asset</p>
        <p>Balance</p>
      </div>
      <div className="grid gap-[10px]">
        {
          mockTokens.map((token, i) => (
            <TokenWithdraw
              key={i}
              icon={token.icon}
              supply={token.supply}
              symbol={token.symbol}
            />
          ))
        }
      </div>
    </div>
  );
}

export default YourBorrows;