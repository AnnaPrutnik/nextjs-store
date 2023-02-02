import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { CartProvider } from 'utils/StoreContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-left" />
    </CartProvider>
  );
}
