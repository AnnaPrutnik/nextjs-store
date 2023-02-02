import { toast } from 'react-toastify';
import { useCart } from './useStore';
import { useDispatch } from './useDispatch';
import { ICartItem } from 'types';
import { Actions, IAction } from 'utils/StoreContext';

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const cart = useCart();

  const onAddProductToCart = (
    slug: string,
    inStock: number,
    price: number,
    quantity?: number
  ) => {
    const existItem = cart.find((item) => item.product === slug);

    let currentQuantity = quantity ? quantity : 1;

    if (existItem && !quantity) {
      currentQuantity = existItem.quantity + 1;
    }

    if (quantity && quantity > inStock) {
      return toast.warn('Sorry! Product is out of stock!');
    }

    const newCartItem: ICartItem = {
      product: slug,
      quantity: currentQuantity,
      price,
    };
    const action: IAction = {
      type: Actions.CART_ADD_ITEM,
      payload: newCartItem,
    };
    dispatch(action);
  };

  return onAddProductToCart;
};
