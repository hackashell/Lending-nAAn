import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ButtonAnimated from "@/components/ButtonAnimated/ButtonAnimated";

export const BorrowSupply = () => {
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
          placeholder="48"
        />
        <div
          className="text-[#595959] text-4xl h-16 flex items-center px-2"
          placeholder="48"
        >
          0
        </div>
        <Select>
          <SelectTrigger className="w-auto border-0 focus:ring-offset-0 bg-inputBg rounded-md h-16">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent className="bg-inputBg text-lg border-0 focus:border-0 active:border-0 text-white">
            <SelectItem value="usdc">USDC</SelectItem>
            <SelectItem value="dai">DAI</SelectItem>
            <SelectItem value="eth">ETH</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-auto border-0 active:border-0 focus:border-0 focus:ring-offset-0 bg-inputBg rounded-md h-16">
            <SelectValue placeholder="Select token" />
          </SelectTrigger>
          <SelectContent className="bg-inputBg text-lg focus:ring-offset-0 border-0 active:border-0 focus:border-0 text-white">
            <SelectItem value="aave">AAVE</SelectItem>
            <SelectItem value="dai">DAI</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ButtonAnimated
        className="w-full text-lg"
        text="Execute"
      />
    </div>
  );
};
