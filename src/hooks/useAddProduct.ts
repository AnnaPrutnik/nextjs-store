import { toast } from 'react-toastify';
import { useCartItems } from './useStore';
import { useDispatch } from './useDispatch';
import { ICartItem, Actions, IAction, IProduct } from 'types';

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const cart = useCartItems();

  const onAddProductToCart = async (product: IProduct, quantity?: number) => {
    const { name, slug, countInStock, image, price } = product;

    const existItem = cart.find((item) => item.slug === slug);

    let currentQuantity = quantity ? quantity : 1;

    if (existItem && !quantity) {
      currentQuantity = existItem.quantity + 1;
    }

    if (quantity && quantity > countInStock) {
      return toast.warn('Sorry! Product is out of stock!');
    }

    const newCartItem: ICartItem = {
      name,
      slug,
      image,
      price,
      quantity: currentQuantity,
    };

    const action: IAction = {
      type: Actions.CART_ADD_ITEM,
      payload: newCartItem,
    };
    dispatch(action);
  };

  return onAddProductToCart;
};
