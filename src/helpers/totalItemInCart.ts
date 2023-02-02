import { ICartItem } from 'types';

type Cart = ICartItem[];

export const calcTotalItemInCart = (cart: Cart) => {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
};
