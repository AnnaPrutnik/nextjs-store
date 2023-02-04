/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { IProduct } from 'types';
import { useAddToCart } from 'hooks';

interface ProductItemProps {
  product: IProduct;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const addToCart = useAddToCart();

  const onClickAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} passHref legacyBehavior>
        <a className="rounded shadow grow object-contain flex items-center">
          <img src={product.image} alt={product.name} className="block" />
        </a>
      </Link>
      <Link href={`/product/${product.slug}`} passHref legacyBehavior>
        <div className="flex flex-col items-center justify-center p-5 cursor-pointer">
          <h2 className="text-lg">{product.name}</h2>
          <p>{product.brand}</p>
          <p>${product.price}</p>
        </div>
      </Link>
      <div className="pb-5 flex justify-center">
        <button
          className="primary-button "
          type="button"
          onClick={onClickAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
