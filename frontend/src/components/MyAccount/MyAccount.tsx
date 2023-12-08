import Avatar from "boring-avatars";

const MyAccount = ({address}) => (
    <div
        className={`flex items-center gap-3 px-10 py-5 bg-[#222222] rounded-lg flex items-center justify-center cursor-pointer`}
    >
        <p className="text-sm text-white">{address}</p>
        <Avatar
            size={30}
            name={address}
            variant="marble"
            colors={["#00C4FF", "#76D7FA", "#FFB6FE", "#EE99F7", "#EE99F7"]}
        />
    </div>
);

export default MyAccount;