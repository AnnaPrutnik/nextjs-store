import React from 'react';
import { Layout, ProductItem } from 'components';
import { IProduct } from 'types';
import { InferGetServerSidePropsType } from 'next';
import axios from 'utils/axios';
import dbConnect from 'utils/db';

const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products }) => {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  console.log('index server side props');
  await dbConnect();
  const {
    data: { data: products },
  } = await axios<{ data: IProduct[] }>('/api/products');

  return { props: { products } };
}

export default Home;
