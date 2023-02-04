import db from 'utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from 'models/User';
import users from 'utils/users.js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await db.connect();
    await UserModel.deleteMany();
    await UserModel.insertMany(users);
    await db.disconnect();
    res.send({ message: 'seeded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
