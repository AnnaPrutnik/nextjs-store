import { useDispatch } from './useDispatch';
import { IShippingDetails, Actions, IAction } from 'types';

export const useSaveShippingDetails = () => {
  const dispatch = useDispatch();

  const onSaveShippingDetails = (body: IShippingDetails) => {
    const action: IAction = {
      type: Actions.SAVE_SHIPPING_ADDRESS,
      payload: body,
    };
    dispatch(action);
  };

  return onSaveShippingDetails;
};
