import React from 'react';
import { CartItem } from 'components';
import { useCartItems } from 'hooks';

export const CartTable = () => {
  const cart = useCartItems();

  console.log(cart);

  return (
    <table className="min-w-full">
      <thead className="border-b">
        <tr>
          <th className="px-5 text-left">Item</th>
          <th className="p-5 text-center">Quantity</th>
          <th className="p-5 text-right">Price</th>
          <th className="p-5 text-right">Amount</th>
          <th className="p-5">Action</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <CartItem cartItem={item} key={item.slug} />
        ))}
      </tbody>
    </table>
  );
};
