import TokenWithdraw from "@/components/TokenWithdraw/TokenWithdraw";

const YourBorrows = () => {
  const mockTokens = [
    {
      icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
      symbol: "USDC",
      supply: 1500,
    },
    {
      icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x111111111117dC0aa78b770fA6A738034120C302/logo.png",
      symbol: "1INCH",
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