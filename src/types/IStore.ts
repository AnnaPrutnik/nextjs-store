import React from 'react';
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

export enum Actions {
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  CART_DELETE_ITEM = 'CART_DELETE_ITEM',
  CART_UPDATE_ITEM = 'CART_UPDATE_ITEM',
  CART_DELETE = 'CART_DELETE',
  SAVE_SHIPPING_ADDRESS = 'SAVE_SHIPPING_ADDRESS',
  SAVE_PAYMENT_METHOD = 'SAVE_PAYMENT_METHOD',
}

export type ActionType = keyof typeof Actions;

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
