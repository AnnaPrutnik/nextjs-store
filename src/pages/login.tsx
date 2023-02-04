import React, { useEffect } from 'react';
import { Layout, LoginForm } from 'components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      const url = redirect || '/';
      router.push(url);
    }
  }, [redirect, router, session?.user]);
  return (
    <Layout title="Login">
      <LoginForm />
    </Layout>
  );
};

export default LoginScreen;
