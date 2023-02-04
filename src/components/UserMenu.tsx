import React from 'react';
import { Menu } from '@headlessui/react';
import { UserMenuItem } from 'components';
import { signOut } from 'next-auth/react';
import { useDeleteCart } from 'hooks/useDeleteCart';

interface UserMenuProps {
  username: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ username }) => {
  const deleteCart = useDeleteCart();

  const onLogoutClick = () => {
    deleteCart();
    signOut({ callbackUrl: '/login' });
  };

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="text-amber-400">{username}</Menu.Button>
      <Menu.Items className="absolute right-0 top-10 w-56 origin-top-right shadow-lg bg-white ">
        <UserMenuItem href="/profile" title="Profile" />
        <UserMenuItem href="/order-history" title="Order history" />
        <UserMenuItem href="#" title="Logout" onClick={onLogoutClick} />
      </Menu.Items>
    </Menu>
  );
};
