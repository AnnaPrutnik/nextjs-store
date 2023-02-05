import React, { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import { IStore, ICartItem, IShippingDetails, IContextValue } from 'types';
import { reducer } from './StoreReducer';

const cookieValue = Cookies.get('cart');

const initialState: IStore = {
  cart: cookieValue
    ? JSON.parse(cookieValue)
    : {
        cartItems: [] as ICartItem[],
        shipping: {} as IShippingDetails,
        payment: '',
      },
};

const initialContext: IContextValue = {
  state: initialState,
  dispatch: () => {},
};

export const Store = createContext<IContextValue>(initialContext);

interface StoreProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}> {children} </Store.Provider>;
}
