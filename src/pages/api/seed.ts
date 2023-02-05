import { NextApiRequest, NextApiResponse } from 'next';
import { ProductModel } from 'models/Product';
import { UserModel } from 'models/User';
import { products } from 'utils/products.js';
import users from 'utils/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await UserModel.deleteMany();
    await UserModel.insertMany(users);
    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);

    res.send({ message: 'seeded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
