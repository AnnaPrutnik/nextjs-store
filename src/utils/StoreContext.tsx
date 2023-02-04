import React, { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import { IStore, ICartItem, IShippingDetails } from 'types';

export enum Actions {
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  CART_DELETE_ITEM = 'CART_DELETE_ITEM',
  CART_UPDATE_ITEM = 'CART_UPDATE_ITEM',
  CART_DELETE = 'CART_DELETE',
  SAVE_SHIPPING_ADDRESS = 'SAVE_SHIPPING_ADDRESS',
  THEME_TOGGLE = 'THEME_TOGGLE',
}

export type ActionType = keyof typeof Actions;

export type IAction =
  | { type: Actions.CART_ADD_ITEM; payload: ICartItem }
  | { type: Actions.CART_DELETE_ITEM; payload: string }
  | { type: Actions.CART_UPDATE_ITEM; payload: ICartItem }
  | { type: Actions.CART_DELETE; payload: null }
  | { type: Actions.SAVE_SHIPPING_ADDRESS; payload: IShippingDetails };

interface IContextValue {
  state: IStore;
  dispatch: React.Dispatch<IAction>;
}

const initialState: IStore = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : {
        cartItems: [] as ICartItem[],
        shipping: {} as IShippingDetails,
      },
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
      const existItem = state.cart.cartItems.find(
        (item) => item.product === newItem.product
      );
      let cartItems: ICartItem[];
      if (existItem) {
        cartItems = state.cart.cartItems.map((item) =>
          item.product === newItem.product
            ? { ...item, quantity: newItem.quantity }
            : item
        );
      } else {
        cartItems = [...state.cart.cartItems, newItem];
      }
      const newCart = { ...state.cart, cartItems };
      Cookies.set('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case Actions.CART_DELETE_ITEM: {
      const slug = action.payload;
      const cartItems = state.cart.cartItems.filter(
        (item) => item.product !== slug
      );
      const newCart = { ...state.cart, cartItems };
      Cookies.set('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case Actions.CART_DELETE: {
      Cookies.remove('cart');
      return {
        ...state,
        cart: {
          cartItems: [] as ICartItem[],
          shipping: {} as IShippingDetails,
        },
      };
    }

    case Actions.SAVE_SHIPPING_ADDRESS: {
      const newCart = { ...state.cart, shipping: action.payload };

      Cookies.set('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
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
