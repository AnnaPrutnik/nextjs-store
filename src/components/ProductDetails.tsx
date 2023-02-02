import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { IProduct } from 'types';
import { useAddToCart } from 'hooks';

interface ProductDetailsProps {
  product: IProduct;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();
  const addToCart = useAddToCart();

  const onClickAddToCart = () => {
    addToCart(product.slug, product.countInStock, product.price);
    router.push('/cart');
  };

  return (
    <>
      <div className="py-2">
        <Link href="/" passHref legacyBehavior>
          <a className="p-1 text-gray-600 underline hover:text-blue-800">
            back to products
          </a>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
          />
        </div>
        <div>
          <h1 className="text-lg">{product.name}</h1>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>
            {product.rating} of {product.numReviews} reviews
          </p>
          <p>Description: {product.description}</p>
        </div>
        <div>
          <div className="action p-5">
            <div className="mb-2 flex justify-between">
              <p>Price</p>
              <p>${product.price}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p>Status</p>
              <p>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</p>
            </div>
            <button
              className="primary-button w-full"
              onClick={onClickAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
