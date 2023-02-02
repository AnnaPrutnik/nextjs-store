import { Layout, ProductItem } from 'components';
import { IProduct } from 'types';
import products from 'utils/products.json';

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {(products as IProduct[]).map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
}
