import React, { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import { IStore, ICartItem } from 'types';

export enum Actions {
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  CART_DELETE_ITEM = 'CART_DELETE_ITEM',
  CART_UPDATE_ITEM = 'CART_UPDATE_ITEM',
  THEME_TOGGLE = 'THEME_TOGGLE',
}

export type ActionType = keyof typeof Actions;

export type IAction =
  | { type: Actions.CART_ADD_ITEM; payload: ICartItem }
  | { type: Actions.CART_DELETE_ITEM; payload: string }
  | { type: Actions.CART_UPDATE_ITEM; payload: ICartItem };

interface IContextValue {
  state: IStore;
  dispatch: React.Dispatch<IAction>;
}

const initialState: IStore = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : ([] as ICartItem[]),
};

const initialContext: IContextValue = {
  state: initialState,
  dispatch: () => {},
};

export const Store = createContext<IContextValue>(initialContext);

function reducer(state: IStore, action: IAction): IStore {
  switch (action.type) {
    case Actions.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.find(
        (item) => item.product === newItem.product
      );
      let cart: ICartItem[];
      if (existItem) {
        cart = state.cart.map((item) =>
          item.product === newItem.product
            ? { ...item, quantity: newItem.quantity }
            : item
        );
      } else {
        cart = [...state.cart, newItem];
      }
      Cookies.set('cart', JSON.stringify(cart));
      return { ...state, cart };
    }

    case Actions.CART_DELETE_ITEM: {
      const slug = action.payload;
      const cart = state.cart.filter((item) => item.product !== slug);
      Cookies.set('cart', JSON.stringify(cart));
      return { ...state, cart };
    }

    default:
      return state;
  }
}

interface StoreProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <Store.Provider value={value}> {children} </Store.Provider>;
}
