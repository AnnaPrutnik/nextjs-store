import { useDispatch } from './useDispatch';
import { Actions, IAction } from 'utils/StoreContext';
import { IShippingDetails } from 'types/IStore';

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
