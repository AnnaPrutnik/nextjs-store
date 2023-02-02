export interface ICartItem {
  product: string;
  quantity: number;
  price: number;
}

export interface IStore {
  cart: ICartItem[];
}
