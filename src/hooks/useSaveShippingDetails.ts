import { useDispatch } from './useDispatch';
import { IShippingDetails, IAction } from 'types';
import { Actions } from 'variables';

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
