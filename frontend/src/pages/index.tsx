import { Inter } from 'next/font/google'
import Navigation from "@/components/Navigation/Navigation";
import { BorrowSupply } from '@/components/BorrowSupply/BorrowSupply';
import UserBorrowsAndSupplies from "@/components/UserBorrowsAndSupplies/UserBorrowsAndSupplies";
import {useSDK} from "@metamask/sdk-react";
import Head from "next/head";
import Stripe from '@/components/OnRamp';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { account, connected } = useSDK();
  // TODO: This checks if user is singed in with MetaMask, we will need to add OR check here for Safe AA
  const loggedIn = account && connected;

  return (
    <>
      <Head>
        <title>Lending nAAn</title>
        <meta name="description" content="Lending nAAn - Lending and borrowing omnidapp powered by the account abstraction" />
      </Head>
      <main>
        <Navigation />
        <BorrowSupply />
        {
          loggedIn &&
          <UserBorrowsAndSupplies />
        }
        {/* <Stripe /> */}
      </main>
    </>
  )
}
