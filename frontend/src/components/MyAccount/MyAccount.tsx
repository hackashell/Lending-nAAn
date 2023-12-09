import Avatar from "boring-avatars";

const MyAccount = ({className, address}) => (
    <div
        className={`${className} flex items-center gap-3 px-10 py-4 bg-[#222222] rounded-lg flex items-center justify-center cursor-pointer`}
    >
        <p className="text-sm text-white">{address}</p>
        {/* TODO: fetch ens image with graph or airstack and display that, fallback to boring avatar if no image is set */}
        <Avatar
            size={30}
            name={address}
            variant="marble"
            colors={["#00C4FF", "#76D7FA", "#FFB6FE", "#EE99F7", "#EE99F7"]}
        />
    </div>
);

export default MyAccount;