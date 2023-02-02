import { useDispatch } from './useDispatch';
import { Actions, IAction } from 'utils/StoreContext';

export const useDeleteProduct = () => {
  const dispatch = useDispatch();

  const onDeleteProductFromCart = (slug: string) => {
    const action: IAction = {
      type: Actions.CART_DELETE_ITEM,
      payload: slug,
    };
    dispatch(action);
  };

  return onDeleteProductFromCart;
};
