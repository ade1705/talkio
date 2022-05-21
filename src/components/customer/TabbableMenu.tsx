import { useRouter } from 'next/router';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

type Menu = {
  name: string;
  url: string;
};

const menus: Menu[] = [
  {
    name: 'Dashboard',
    url: '/customer/dashboard',
  },
  {
    name: 'Forms',
    url: '/customer/forms',
  },
  {
    name: 'Entries',
    url: '/components/dashboard',
  },
  {
    name: 'Settings',
    url: '/components/dashboard',
  },
];

const TabbableMenu = () => {
  const router = useRouter();
  return (
    <div className='flex justify-center'>
      <div className='max-w-8xl mx-auto px-4 sm:px-6 md:px-8'>
        <div className='my-4 flex rounded-md bg-white/30 p-1'>
          {menus.map((menu: Menu) => (
            <UnstyledLink
              href={menu.url}
              key={menu.name}
              className={`w-28 p-3 text-center hover:bg-white hover:text-blue-700 ${
                router.pathname === menu.url && `bg-white text-blue-700`
              } cursor-pointer rounded-md text-sm font-medium`}
            >
              {menu.name}
            </UnstyledLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabbableMenu;
