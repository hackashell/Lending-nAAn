import { AirstackProvider } from "@airstack/airstack-react";
import { Layout } from '@/components/Layout/Layout';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AirstackProvider apiKey={process.env.NEXT_PUBLIC_AIRSTACK_API_KEY}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AirstackProvider>
  )
}
