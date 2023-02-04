export interface ICartItem {
  product: string;
  quantity: number;
  price: number;
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
  };
}
