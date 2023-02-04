import { useContext } from 'react';
import { Store } from 'store/StoreContext';

export const useDispatch = () => {
  const { dispatch } = useContext(Store);

  if (!dispatch) {
    throw new Error(
      'useStore has to be used within <CurrentUserContext.Provider>'
    );
  }

  return dispatch;
};
