import { useDispatch } from './useDispatch';
import { IAction } from 'types';
import { Actions } from 'variables';

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
