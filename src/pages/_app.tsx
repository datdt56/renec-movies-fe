import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "@/components/Layout";
import axiosConfigs from "@/configs/axios";
import useUser from "@/hooks/useUser";

axiosConfigs()
export default function App({ Component, pageProps }: AppProps) {
  useUser()
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}
