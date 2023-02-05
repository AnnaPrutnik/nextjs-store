import { useDispatch } from './useDispatch';
import { IAction } from 'types';
import { Actions } from 'variables';

export const useDeleteCart = () => {
  const dispatch = useDispatch();

  const onDeleteCart = () => {
    const action: IAction = {
      type: Actions.CART_DELETE,
      payload: null,
    };
    dispatch(action);
  };

  return onDeleteCart;
};
