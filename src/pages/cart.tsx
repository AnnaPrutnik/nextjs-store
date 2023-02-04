import React from 'react';
import { Layout, EmptyCart, CartTable, Checkout } from 'components';
import { useCartItems } from 'hooks';
import dynamic from 'next/dynamic';

const CartScreen = () => {
  const cart = useCartItems();

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping cart</h1>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid md:grid-cols-4 gap-3 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <CartTable />
          </div>
          <div>
            <Checkout />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
