import db from 'utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ProductModel } from 'models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.connect();
    const products = await ProductModel.find().lean();
    await db.disconnect();
    res.status(200).json({ status: 'success', code: 200, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
