import Avatar from "boring-avatars";
import { useGetWalletENS } from "@airstack/airstack-react";
import {Spinner} from "@/components/Spinner";

interface Props {
  className?: string;
  address: string;
}

const MyAccount: React.FC<Props> = ({ className, address }) => {
  const addressShorten = address.slice(0, 7) + "..." + address.slice(37);
  const { data, loading, pagination } = useGetWalletENS({
    identity: address,
    blockchain: "ethereum"
  });
  const addressToShow =  data?.Wallet?.primaryDomain?.name || addressShorten;

  return (
    <div
      className={`${className} w-[220px] flex items-center gap-3 px-10 py-4 bg-[#222222] rounded-lg justify-center cursor-pointer`}
    >
      {
        loading ?
          <Spinner className="w-[25px] h-[25px]" /> :
          (
            <>
              <p className="text-sm text-white">{addressToShow}</p>
              <div className="w-[30px]">
                <Avatar
                  size={30}
                  name={address}
                  variant="marble"
                  colors={["#00C4FF", "#76D7FA", "#FFB6FE", "#EE99F7", "#EE99F7"]}
                />
              </div>
              {/* TODO: fetch ens image with graph or airstack and display that, fallback to boring avatar if no image is set */}

            </>
          )
      }

    </div>
  );
};

export default MyAccount;
