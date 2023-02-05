import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { OrderModel } from 'models/Order';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'POST': {
      try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({
            code: 401,
            status: 'error',
            message: 'SignIn required',
          });
        }
        const { user } = session;
        const newOrder = new OrderModel({ ...req.body, user_id: user.id });
        const order = await newOrder.save();
        return res
          .status(200)
          .json({ status: 'success', code: 201, data: order });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

    case 'GET': {
      return res.send('GET REQUEST');
    }

    default:
      res.send('not POST method');
  }
}
