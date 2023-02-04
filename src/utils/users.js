import bcrypt from 'bcryptjs';

const users = [
  {
    username: 'John',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    username: 'Jane',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
];

export default users;
