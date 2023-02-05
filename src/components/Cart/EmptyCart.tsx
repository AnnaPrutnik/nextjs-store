import React from 'react';
import Link from 'next/link';

export const EmptyCart = () => {
  return (
    <div>
      Cart is empty.
      <Link href="/">
        <span className="text-blue-500 cursor-pointer">Go shopping</span>
      </Link>
    </div>
  );
};
