import React from 'react';
import { Layout, CheckoutWizard, PlaceorderForm } from 'components';

const PlaceOrder = () => {
  return (
    <Layout title="Place order">
      <CheckoutWizard activeStep={3} />
      <PlaceorderForm />
    </Layout>
  );
};

PlaceOrder.auth = true;

export default PlaceOrder;
