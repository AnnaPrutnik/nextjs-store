import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCart } from 'hooks';
import { calcTotalItemInCart } from 'helpers';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const cart = useCart();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const total = calcTotalItemInCart(cart);
    setCartItemsCount(total);
  }, [cart]);

  return (
    <>
      <Head>
        <title>{title ? title : 'E-commerce'}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between items-center shadow-md px-4">
            <Link href="/" legacyBehavior passHref>
              <a className="text-lg font-bold"> amazona</a>
            </Link>
            <ul className="flex">
              <li>
                <Link href="/cart" legacyBehavior passHref>
                  <a className="p-2">
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-full bg-red-500 text-white text-xs font-bold px-2 py-1">
                        {cartItemsCount}
                      </span>
                    )}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/login" legacyBehavior passHref>
                  <a className="p-2">Login</a>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner text-xs">
          2023
        </footer>
      </div>
    </>
  );
};
