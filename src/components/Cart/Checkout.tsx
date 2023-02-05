import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useCartItems } from 'hooks';
import { calcTotalItemInCart, calcTotalCartPrice } from 'helpers';

export const Checkout = () => {
  const router = useRouter();
  const cart = useCartItems();

  const total = useMemo(() => calcTotalItemInCart(cart), [cart]);
  const amount = useMemo(() => calcTotalCartPrice(cart), [cart]);

  return (
    <div className="checkout p-5">
      <div className="pb-3 text-xl">
        Subtotal ({total}): <span className="font-bold"> ${amount}</span>
      </div>
      <button
        className="primary-button w-full"
        onClick={() => router.push('shipping')}
      >
        Check Out
      </button>
    </div>
  );
};
