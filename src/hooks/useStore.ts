import { useContext } from 'react';
import { Store } from 'store/StoreContext';

export const useStore = () => {
  const { state } = useContext(Store);

  if (!state) {
    throw new Error(
      'useStore has to be used within <CurrentUserContext.Provider>'
    );
  }

  return state;
};

export const useCartItems = () => {
  const state = useStore();
  return state.cart.cartItems;
};

export const useShippingAddress = () => {
  const state = useStore();
  return state.cart.shipping;
};

export const usePaymentMethod = () => {
  const state = useStore();
  return state.cart.payment;
};
