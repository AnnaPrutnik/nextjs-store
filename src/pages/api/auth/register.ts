import { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from 'models/User';
import { getError } from 'helpers/error';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ status: 'error', code: 409, message: 'Email in Use' });
    }
    const newUser = new UserModel({ username, email, password });
    const user = await newUser.save();

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        email: user.email,
        isAdmin: user.isAdmin,
        username: user.username,
      },
    });
  } catch (error) {
    const err = getError(error);
    res
      .status(500)
      .json({ status: 'error', code: '500', message: err.message });
  }
}
