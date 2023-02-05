import { ProductModel } from 'models';
import { IProduct } from 'types';

export const getProducts = async () => {
  const result = await ProductModel.find();

  const products: IProduct[] = result.map((doc) => {
    const product = doc.toObject();
    product._id = product._id.toString();
    product.createdAt = product.createdAt.toString();
    product.updatedAt = product.updatedAt.toString();
    return product;
  });
  if (!products) {
    return [] as IProduct[];
  }
  return products;
};
