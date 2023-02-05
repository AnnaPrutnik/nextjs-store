import db from 'utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { OrderModel } from 'models/Order';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { IOrder } from 'types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        code: 401,
        status: 'error',
        message: 'SignIn required',
      });
    }
    await db.connect();
    const order = await OrderModel.findById(id).lean();
    await db.disconnect();
    res.status(200).json({ status: 'success', code: 200, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
