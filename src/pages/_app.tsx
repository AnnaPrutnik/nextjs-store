import 'styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from 'store/StoreContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Auth } from 'components';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }; // add auth type
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer position="top-left" />
      </CartProvider>
    </SessionProvider>
  );
}
