import React from 'react';
import { useRouter } from 'next/router';

import { Layout } from 'components';
const OrderScreen = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return <Layout title="Orders history">OrderScreen</Layout>;
};

export default OrderScreen;
