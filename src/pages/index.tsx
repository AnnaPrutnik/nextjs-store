import React from 'react';
import { Layout, ProductItem } from 'components';
import { IProduct } from 'types';
import { InferGetServerSidePropsType } from 'next';

const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products }) => {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {(products as IProduct[]).map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const products: IProduct[] = await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return { props: { products } };
}

export default Home;
