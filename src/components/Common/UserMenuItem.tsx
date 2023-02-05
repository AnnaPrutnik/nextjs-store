import React from 'react';
import Link from 'next/link';

interface UserMenuItemProps {
  href: string;
  title: string;
  onClick?: () => void;
}

export const UserMenuItem: React.FC<UserMenuItemProps> = ({
  href,
  title,
  onClick,
}) => {
  if (onClick) {
    return (
      <button className="dropdown-menu" onClick={onClick}>
        {title}
      </button>
    );
  } else {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className="dropdown-menu">{title}</a>
      </Link>
    );
  }
};
