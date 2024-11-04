import '../styles/main.css'
import NextNProgress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'
import { AuthInit } from 'hooks/useAuthGuard'
import { Provider as StoreProvider } from 'react-redux'
import { store } from 'store'
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr'
import { swrOptions } from 'server/fetcher'
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Developers 99</title>
      </Head>
      <StoreProvider store={store}>
        <AuthInit>
          <SWRConfig value={swrOptions}>
            <NextNProgress height={5} color='#FDA758' options={{ easing: "ease" }} />
            <Component {...pageProps} />
          </SWRConfig>
        </AuthInit>
        <ToastContainer />
      </StoreProvider>
    </>
  )
}
