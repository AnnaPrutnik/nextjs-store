import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Layout } from 'components';
import { ProductDetails } from 'components';
import { IProduct } from 'types';

export const getServerSideProps: GetServerSideProps<{
  product: IProduct;
}> = async (context) => {
  const slug = context.params?.slug;
  const product = await fetch(`http://localhost:3000/api/products/${slug}`)
    .then((res) => res.json())
    .then((res) => res.data);
  return { props: { product } };
};

const ProductScreen: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ product }) => {
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
