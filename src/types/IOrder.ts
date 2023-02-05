import { ICartItem, IShippingDetails } from 'types';
export interface IOrder {
  _id: string;
  user_id: string;
  orderItems: ICartItem[];
  shipping: IShippingDetails;
  payment: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
}
