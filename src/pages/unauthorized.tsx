import React from 'react';
import { Layout } from 'components';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized Page">
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
      <div>
        You need to be logged in.
        <Link href="/login">
          <span className="text-blue-500">Login</span>
        </Link>
      </div>
    </Layout>
  );
};

export default Unauthorized;
