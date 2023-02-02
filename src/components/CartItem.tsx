import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline';
import { ICartItem } from 'types';
import products from 'utils/products.json';
import { useDeleteProduct } from 'hooks';
import { QuantityChanger } from 'components';

interface CartItemProps {
  cartItem: ICartItem;
}

export const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const product = products.find((product) => product.slug === cartItem.product);
  const deleteProduct = useDeleteProduct();

  const onClickRemoveBtn = () => {
    deleteProduct(cartItem.product);
  };

  if (!product) {
    return <div>no found the product</div>;
  }

  const amount = Math.floor(product.price * cartItem.quantity);
  return (
    <tr className="border-b">
      <td className="px-5 text-left">
        <Link href={cartItem.product} passHref legacyBehavior>
          <a className="flex items-center gap-2">
            <Image
              src={product.image}
              alt={product.name}
              width={50}
              height={50}
            />
            <span>{product.name}</span>
          </a>
        </Link>
      </td>
      <td className="p-5 text-right">
        <QuantityChanger cartItem={cartItem} inStock={product.countInStock} />
      </td>
      <td className="p-5 text-right">${product.price}</td>
      <td className="p-5 text-right">${amount}</td>
      <td className="p-5 text-center">
        <button onClick={onClickRemoveBtn}>
          <XCircleIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};
