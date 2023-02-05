import React, { useState, useEffect } from 'react';
import { useCartItems } from 'hooks';
import Link from 'next/link';
import { calcTotalItemInCart } from 'helpers';
import { useSession } from 'next-auth/react';
import { UserMenu } from 'components';

export const Header = () => {
  const cart = useCartItems();
  const { data: session, status } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const total = calcTotalItemInCart(cart);
    setCartItemsCount(total);
  }, [cart]);

  return (
    <header>
      <nav className="flex h-12 justify-between items-center shadow-md px-4">
        <Link href="/" legacyBehavior passHref>
          <a className="text-lg font-bold">amazona</a>
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
            {status === 'loading' && <div>Loading...</div>}
            {status === 'unauthenticated' && (
              <Link href="/login" legacyBehavior passHref>
                <a className="p-2">Login</a>
              </Link>
            )}
            {status === 'authenticated' && session.user.username && (
              <UserMenu username={session.user.username} />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
