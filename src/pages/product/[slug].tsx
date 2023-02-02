import React from 'react';
import { Layout } from 'components';
import { ProductDetails } from 'components';
import { useRouter } from 'next/router';
import products from 'utils/products.json';

const ProductScreen = () => {
  const { query } = useRouter();
  const slug = query.slug;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <Layout title="no found">Product not found</Layout>;
  }
  return (
    <Layout title={product.name}>
      <ProductDetails product={product} />
    </Layout>
  );
};

export default ProductScreen;
