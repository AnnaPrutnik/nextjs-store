import { useDispatch } from './useDispatch';
import { Actions, IAction } from 'types';

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
