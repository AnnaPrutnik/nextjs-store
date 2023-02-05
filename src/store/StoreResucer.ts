import { Actions, IStore, IAction, ICartItem, IShippingDetails } from 'types';
import Cookies from 'js-cookie';

export function reducer(state: IStore, action: IAction): IStore {
  switch (action.type) {
    case Actions.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      let cartItems: ICartItem[];
      if (existItem) {
        cartItems = state.cart.cartItems.map((item) =>
          item.slug === newItem.slug
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
        (item) => item.slug !== slug
      );
      const newCart = { ...state.cart, cartItems };
      Cookies.set('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case Actions.CART_DELETE: {
      const newCart = { ...state.cart, cartItems: [] as ICartItem[] };
      Cookies.set('cart', JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };
    }

    case Actions.SAVE_SHIPPING_ADDRESS: {
      const newCart = { ...state.cart, shipping: action.payload };

      Cookies.set('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    case Actions.SAVE_PAYMENT_METHOD: {
      const newCart = { ...state.cart, payment: action.payload };
      Cookies.set('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    default:
      return state;
  }
}
