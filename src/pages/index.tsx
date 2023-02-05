import React from 'react';
import { Layout, ProductItem } from 'components';
import { IProduct } from 'types';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import dbConnect from 'utils/db';
import { getProducts } from 'repository/Products';

export const getServerSideProps: GetServerSideProps<{
  products: IProduct[];
}> = async () => {
  console.log('getServerProps in index.tsx');
  await dbConnect();

  const products = await getProducts();
  return { props: { products } };
};

const Home: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ products }) => {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 &&
          products.map((product) => (
            <ProductItem product={product} key={product.slug} />
          ))}
      </div>
    </Layout>
  );
};

// export async function getServerSideProps(context) {
//   await dbConnect();
//   const products = await ProductModel.find()
//     .lean()
//     .exec(function (err, data) {
//       return context.res.end(JSON.stringify(data));
//     });

//   return { props: { products } };
// }

export default Home;
