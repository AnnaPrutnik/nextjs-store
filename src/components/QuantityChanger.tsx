import React, { useState } from 'react';
import { useAddToCart } from 'hooks';
import { ICartItem } from 'types';
import { toast } from 'react-toastify';

interface QuantityChangerProps {
  cartItem: ICartItem;
  inStock: number;
}

export const QuantityChanger: React.FC<QuantityChangerProps> = ({
  cartItem,
  inStock,
}) => {
  const [value, setValue] = useState(cartItem.quantity);
  const { price, product, quantity } = cartItem;
  const addProduct = useAddToCart();

  const onIncrementQuantity = () => {
    addProduct(product, inStock, price, quantity + 1);
    setValue((prev) => prev + 1);
  };

  const onDecrementQuantity = () => {
    addProduct(product, inStock, price, quantity - 1);
    setValue((prev) => prev - 1);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number((e.target as HTMLInputElement).value);
    if (value < 1 || value > inStock) {
      return toast.error('Sorry! The quantity of product is not available!');
    }
    addProduct(product, inStock, price, value);
    setValue(value);
  };

  return (
    <div className="inline-flex text-lg gap-2 border items-center ">
      <button
        onClick={onDecrementQuantity}
        className="quantity-button"
        disabled={quantity === 1}
      >
        -
      </button>
      <input
        className="w-7 text-center"
        value={value}
        onChange={onChangeInput}
      />
      <button
        onClick={onIncrementQuantity}
        className="quantity-button"
        disabled={quantity === inStock}
      >
        +
      </button>
    </div>
  );
};
