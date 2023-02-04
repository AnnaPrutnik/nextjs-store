import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

interface AuthProps {
  children: React.ReactNode;
}

export const Auth: React.FC<AuthProps> = ({ children }) => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
