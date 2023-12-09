import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navigation from "@/components/Navigation/Navigation";
import { BorrowSupply } from '@/components/BorrowSupply/BorrowSupply';
import UserBorrowsAndSupplies from "@/components/UserBorrowsAndSupplies/UserBorrowsAndSupplies";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Navigation />
      <BorrowSupply />
      <UserBorrowsAndSupplies />
    </main>
  )
}
