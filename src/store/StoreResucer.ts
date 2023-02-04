import { Actions, IStore, IAction, ICartItem, IShippingDetails } from 'types';
import Cookies from 'js-cookie';

export function reducer(state: IStore, action: IAction): IStore {
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

    case Actions.SAVE_PAYMENT_METHOD: {
      const newCart = { ...state.cart, payment: action.payload };
      Cookies.set('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }

    default:
      return state;
  }
}
