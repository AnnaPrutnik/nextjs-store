import React, { useState, useEffect } from 'react';
import { paymentWay } from 'constants/paymentWay';
import { useRouter } from 'next/router';
import { useSavePayment, usePaymentMethod, useShippingAddress } from 'hooks';

export const PaymentForm = () => {
  const router = useRouter();
  const savePayment = useSavePayment();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentWay[0]
  );
  const paymentMethod = usePaymentMethod();
  const shipping = useShippingAddress();

  useEffect(() => {
    if (!shipping.address) {
      router.push('/shipping');
    }
    if (paymentMethod.length > 0) {
      setSelectedPaymentMethod(paymentMethod);
    } else {
      savePayment(selectedPaymentMethod);
    }
  }, []);

  useEffect(() => {
    savePayment(selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/place-order');
  };

  return (
    <form className="mx-auto max-w-screen-md" onSubmit={onSubmitForm}>
      <h1 className="mb-4 text-xl">Payment Method</h1>
      {paymentWay.map((payment) => (
        <div key={payment} className="mb-4 ">
          <input
            name="paymentMethod"
            className="p-2 outline-none focus:ring-0"
            id={payment}
            type="radio"
            checked={selectedPaymentMethod === payment}
            onChange={() => setSelectedPaymentMethod(payment)}
          />
          <label htmlFor={payment} className="ml-3">
            {payment}
          </label>
        </div>
      ))}
      <div className="mb-4 flex gap-4">
        <button
          className="primary-button"
          type="button"
          onClick={() => router.push('/shipping')}
        >
          Back
        </button>
        <button className="primary-button" type="submit">
          Next
        </button>
      </div>
    </form>
  );
};
