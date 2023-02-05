import React, { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useCartItems,
  useShippingAddress,
  usePaymentMethod,
  useDeleteCart,
} from 'hooks';
import { CartTable } from 'components';
import { getError, roundPrice, calcTotalCartPrice } from 'helpers';
import { toast } from 'react-toastify';
import axios from 'utils/axios';

export const PlaceorderForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cartItems = useCartItems();
  const shipping = useShippingAddress();
  const payment = usePaymentMethod();
  const clearCart = useDeleteCart();

  const itemsPrice = useMemo(() => {
    return roundPrice(calcTotalCartPrice(cartItems));
  }, [cartItems]);

  const taxPrice = useMemo(() => {
    return roundPrice(itemsPrice * 0.15);
  }, [itemsPrice]);

  const shippingPrice = itemsPrice > 200 ? 0 : 15;

  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  useEffect(() => {
    if (!payment) {
      router.push('/payment');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickPlaceOrder = async () => {
    try {
      setLoading(true);
      const {
        data: { data: order },
      } = await axios.post('api/order', {
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      console.log(order);

      clearCart();
      router.push(`/order/${order._id}`);
    } catch (error) {
      const customError = getError(error);
      toast.error(customError.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-xl mb-4">Place Order</h1>
      {cartItems.length == 0 ? (
        <div>
          Cart is empty.{' '}
          <Link href="/">
            <span className="text-blue-500"> Go shopping</span>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-5">
          <div className="md:col-span-3">
            <div className="checkout p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div className="mb-1">
                {shipping.fullName}, {shipping.address}, {shipping.city},{' '}
                {shipping.postalCode}, {shipping.country}
              </div>
              <div>
                <Link href="/shipping">
                  <span className="text-blue-500">Edit</span>
                </Link>
              </div>
            </div>
            <div className="checkout p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div className="mb-1">{payment}</div>
              <div>
                <Link href="/payment">
                  <span className="text-blue-500">Edit</span>
                </Link>
              </div>
            </div>
            <div className="checkout p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <CartTable />
            </div>
          </div>
          <div>
            <div className="checkout p-5 text-lg">
              <h2 className="mb-2">Order Summery</h2>
              <ul>
                <li className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </li>
                <li className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </li>
                <li className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </li>
                <li className="mb-2 flex justify-between border-t pt-1">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </li>
              </ul>
              <button
                disabled={loading}
                className="primary-button w-full"
                onClick={onClickPlaceOrder}
              >
                {loading ? 'Loading...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
