import { Inter } from 'next/font/google'
import Navigation from "@/components/Navigation/Navigation";
import { BorrowSupply } from '@/components/BorrowSupply/BorrowSupply';
import UserBorrowsAndSupplies from "@/components/UserBorrowsAndSupplies/UserBorrowsAndSupplies";
import {useSDK} from "@metamask/sdk-react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { account, connected } = useSDK();
  // TODO: This checks if user is singed in with MetaMask, we will need to add OR check here for Safe AA
  const loggedIn = account && connected;

  return (
    <main>
      <Navigation />
      <BorrowSupply />
      {
        loggedIn &&
        <UserBorrowsAndSupplies />
      }
    </main>
  )
}
