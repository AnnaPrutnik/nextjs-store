import { useDispatch } from './useDispatch';
import { Actions, IAction } from 'types';

export const useSavePayment = () => {
  const dispatch = useDispatch();

  const onSavePayment = (payment: string) => {
    const action: IAction = {
      type: Actions.SAVE_PAYMENT_METHOD,
      payload: payment,
    };
    dispatch(action);
  };

  return onSavePayment;
};
