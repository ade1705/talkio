import * as React from 'react';

import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';

import Logo from '~/svg/logo.svg';

const links = [{ href: '/', label: 'Login' }];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='font-bold hover:text-gray-600'>
          <Logo className='text-8xl' />
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
            <li>
              <ButtonLink href='/get-started' variant='light'>
                Get Started
              </ButtonLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
