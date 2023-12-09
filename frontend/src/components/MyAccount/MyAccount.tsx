import Avatar from "boring-avatars";

interface Props {
  className?: string;
  address: string;
}

const MyAccount: React.FC<Props> = ({ className, address }) => {
  const addressShorten = address.slice(0, 7) + "..." + address.slice(37);

  return (
    <div
      className={`${className} flex items-center gap-3 px-10 py-4 bg-[#222222] rounded-lg justify-center cursor-pointer`}
    >
      <p className="text-sm text-white">{addressShorten}</p>
      {/* TODO: fetch ens image with graph or airstack and display that, fallback to boring avatar if no image is set */}
      <Avatar
        size={30}
        name={address}
        variant="marble"
        colors={["#00C4FF", "#76D7FA", "#FFB6FE", "#EE99F7", "#EE99F7"]}
      />
    </div>
  );
};

export default MyAccount;
