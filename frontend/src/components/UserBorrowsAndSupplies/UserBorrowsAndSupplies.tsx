import YourBorrows from "@/components/YourBorrows/YourBorrows";
import YourSupplies from "@/components/YourSupplies/YourSupplies";

const UserBorrowsAndSupplies = () => (
  <div className="grid grid-cols-2 gap-10 mx-auto w-4/5">
    <YourBorrows />
    <YourSupplies />
  </div>
);

export default UserBorrowsAndSupplies;