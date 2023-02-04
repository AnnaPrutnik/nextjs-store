import React from 'react';
import { Layout, CheckoutWizard, PaymentForm } from 'components';

const Payment = () => {
  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2} />
      <PaymentForm />
    </Layout>
  );
};

Payment.auth = true;

export default Payment;
