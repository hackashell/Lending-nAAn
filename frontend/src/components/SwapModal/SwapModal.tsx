import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {AnimatedButton} from "@/components/AnimatedButton/AnimatedButton";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const SwapModal = () => (
  <Dialog>
    <DialogTrigger>
      <AnimatedButton
        className="h-16"
        text={"Swap 🔁"}
        onClick={() => {}}
      />
    </DialogTrigger>
    <DialogContent className="bg-[#181818] border-0">
      <DialogHeader className="p-2">
        <DialogTitle className="text-lg my-1">
          Swap tokens
        </DialogTitle>
        <DialogDescription className="py-2">
          <div className="flex flex-col gap-4">
            <div className="flex gap-[10px]">
              <Input
                className="bg-[#222222] rounded-sm text-white text-4xl h-16 p-2 border-0 focus:border-0 active:border-0 focus:ring-0 focus:outline-0 placeholder:text-[#595959]"
                type="number"
                placeholder="0"
              />
              <Select>
                <SelectTrigger className="w-[300px] border-0 focus:ring-offset-0 bg-[#222222] rounded-md h-16">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent className="bg-inputBg text-lg border-0 focus:border-0 active:border-0 text-white">
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="dai">DAI</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-[10px]">
              <Input
                className="bg-[#222222] rounded-sm text-white text-4xl h-16 p-2 border-0 focus:border-0 active:border-0 focus:ring-0 focus:outline-0 placeholder:text-[#595959]"
                type="number"
                placeholder="0"
              />
              <Select>
                <SelectTrigger className="w-[300px] border-0 focus:ring-offset-0 bg-[#222222] rounded-md h-16">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent className="bg-inputBg text-lg border-0 focus:border-0 active:border-0 text-white">
                  <SelectItem value="usdc">USDC</SelectItem>
                  <SelectItem value="dai">DAI</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AnimatedButton
              text="Swap"
              onClick={() => {}}
              className="w-[100%] m-auto h-12 text-base"
            />
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default SwapModal;