import React from 'react';

import { Layout, CheckoutWizard, CheckoutForm } from 'components';

const Shipping = () => {
  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />
      <CheckoutForm />
    </Layout>
  );
};

Shipping.auth = true;

export default Shipping;
