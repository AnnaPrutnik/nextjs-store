import React, { useState, useEffect } from 'react';
import { useAddToCart } from 'hooks';
import { ICartItem, IProduct } from 'types';

interface QuantityChangerProps {
  cartItem: ICartItem;
}

export const QuantityChanger: React.FC<QuantityChangerProps> = ({
  cartItem,
}) => {
  const [value, setValue] = useState(cartItem.quantity);
  const [product, setProduct] = useState<IProduct | null>(null);
  const { slug, quantity } = cartItem;
  const addToCart = useAddToCart();

  useEffect(() => {
    getProduct();
  }, [cartItem]);

  const getProduct = async () => {
    const product: IProduct = await fetch(
      `http://localhost:3000/api/products/${slug}`
    )
      .then((res) => res.json())
      .then((res) => res.data);
    if (!product) {
      return;
    }
    setProduct(product);
  };

  const onIncrementQuantity = async () => {
    if (product) {
      addToCart(product, quantity + 1);
      setValue((prev) => prev + 1);
    }
  };

  const onDecrementQuantity = async () => {
    if (product) {
      addToCart(product, quantity - 1);
      setValue((prev) => prev - 1);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number((e.target as HTMLInputElement).value);
    if (product) {
      addToCart(product, value);
    }
    setValue(value);
  };

  return (
    <div className="inline-flex text-lg border items-center ">
      <button
        onClick={onDecrementQuantity}
        className="quantity-button"
        disabled={quantity === 1}
      >
        -
      </button>
      <input
        className="w-10 text-center p-0"
        value={value}
        onChange={onChangeInput}
      />
      <button
        onClick={onIncrementQuantity}
        className="quantity-button"
        disabled={quantity === product?.countInStock}
      >
        +
      </button>
    </div>
  );
};
