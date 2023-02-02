import { useContext } from 'react';
import { Store } from 'utils/StoreContext';

export const useStore = () => {
  const { state } = useContext(Store);

  if (!state) {
    throw new Error(
      'useStore has to be used within <CurrentUserContext.Provider>'
    );
  }

  return state;
};

export const useCart = () => {
  const state = useStore();

  return state.cart;
};
