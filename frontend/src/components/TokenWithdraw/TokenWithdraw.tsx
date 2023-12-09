const TokenWithdraw = ({icon, symbol, supply}) => (
  <div
    className="group bg-[#181818] px-[26px] py-[24px] flex items-center justify-between rounded-xl cursor-pointer border border-[#181818] hover:border-[--primary-color]"
    onClick={() => alert("Not implemented yet")}
  >
    <div className="flex items-center gap-[10px]">
      <img className="w-[30px]" src={icon} alt={`${symbol} logo`} />
      <p className="font-bold">{symbol}</p>
    </div>
    <p className="group-hover:hidden">{supply}</p>
    <p className="hidden group-hover:block text-[--primary-color]">Withdraw</p>
  </div>
);

export default TokenWithdraw;