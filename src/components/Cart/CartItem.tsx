import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline';
import { ICartItem } from 'types';
import { useDeleteProduct } from 'hooks';
import { QuantityChanger } from 'components';

interface CartItemProps {
  cartItem: ICartItem;
}

export const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const deleteProduct = useDeleteProduct();

  const onClickRemoveBtn = () => {
    deleteProduct(cartItem.slug);
  };

  const amount = Math.floor(cartItem.price * cartItem.quantity);

  return (
    <tr className="border-b">
      <td className="px-5 text-left">
        <Link href={`/product/${cartItem.slug}`} passHref legacyBehavior>
          <a className="flex items-center gap-2">
            <Image
              src={cartItem.image}
              alt={cartItem.name}
              width={50}
              height={50}
            />
            <span>{cartItem.name}</span>
          </a>
        </Link>
      </td>
      <td className="p-5 text-right">
        <QuantityChanger cartItem={cartItem} />
      </td>
      <td className="p-5 text-right">${cartItem.price}</td>
      <td className="p-5 text-right">${amount}</td>
      <td className="p-5 text-center">
        <button onClick={onClickRemoveBtn}>
          <XCircleIcon className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};
