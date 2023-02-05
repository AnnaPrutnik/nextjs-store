import React from 'react';
import { Actions } from 'variables';
export interface ICartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface IShippingDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IStore {
  cart: {
    cartItems: ICartItem[];
    shipping: IShippingDetails;
    payment: string;
  };
}

// export type ActionType = keyof typeof actions;

export type IAction =
  | { type: Actions.CART_ADD_ITEM; payload: ICartItem }
  | { type: Actions.CART_DELETE_ITEM; payload: string }
  | { type: Actions.CART_UPDATE_ITEM; payload: ICartItem }
  | { type: Actions.CART_DELETE; payload: null }
  | { type: Actions.SAVE_SHIPPING_ADDRESS; payload: IShippingDetails }
  | { type: Actions.SAVE_PAYMENT_METHOD; payload: string };

export interface IContextValue {
  state: IStore;
  dispatch: React.Dispatch<IAction>;
}
