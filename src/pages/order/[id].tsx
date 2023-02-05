import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Layout } from 'components';
import { IOrder } from 'types';
import { getError } from 'helpers';
import axios from 'utils/axios';

const OrderScreen = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setOrder(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (!order || (order._id && order._id !== id)) {
      getOrder();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, id]);

  const getOrder = async () => {
    try {
      setLoading(true);
      const {
        data: { data: order },
      } = await axios(`/api/order/${id}`);

      if (!order) {
        setError('No order');
      }
      setOrder(order as IOrder);
    } catch (error) {
      const customError = getError(error);
      setError(customError.message);
    }
  };

  return (
    <Layout title="Orders history">
      <h1 className="text-lg">Order Details</h1>
      {loading && <div>Loading...</div>}
      {error && (
        <div className="my-3 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}
      {order && (
        <div className="grid md:grid-cols-4 gap-5">
          <div className="md:col-span-3">
            <div className="checkout p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div className="mb-1">
                {order.shipping.fullName}, {order.shipping.address},
                {order.shipping.city}, {order.shipping.postalCode},
                {order.shipping.country}
              </div>
              {order.isDelivered ? (
                <div className="alert-success">
                  Delivered at {order.deliveredAt}
                </div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>
            <div className="checkout p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div className="mb-1">{order.payment}</div>
              {order.isPaid ? (
                <div className="alert-success">Paid at {order.paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>
            <div className="checkout p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-center">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr className="border-b" key={item.slug}>
                      <td className="px-5 text-left">
                        <Link
                          href={`/product/${item.slug}`}
                          passHref
                          legacyBehavior
                        >
                          <a className="flex items-center gap-2">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            <span>{item.name}</span>
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-right">
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="checkout p-5 text-lg">
              <h2 className="mb-2">Order Summery</h2>
              <ul>
                <li className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </li>
                <li className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </li>
                <li className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </li>
                <li className="mb-2 flex justify-between border-t pt-1">
                  <div>Total</div>
                  <div>${order.totalPrice}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

OrderScreen.auth = true;

export default OrderScreen;
