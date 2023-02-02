import { ICartItem } from 'types';

type Cart = ICartItem[];

export const calcTotalCartPrice = (cart: Cart) => {
  return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
};
