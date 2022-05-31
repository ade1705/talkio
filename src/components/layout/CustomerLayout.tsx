import * as React from 'react';

import TabbableMenu from '@/components/customer/TabbableMenu';
import Seo from '@/components/Seo';

import Logo from '~/svg/logo.svg';

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Seo />
      <div className='min-h-screen'>
        <div className='supports-backdrop-blur:bg-white/95 sticky top-0 z-40 w-full flex-none bg-white backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] lg:z-50 lg:border-b lg:border-slate-900/10'>
          <div className='max-w-8xl mx-auto'>
            <div className='mx-4 border-b border-slate-900/10 py-2 dark:border-slate-300/10 lg:mx-0 lg:border-0 lg:px-8'>
              <div className='relative flex items-center'>
                <a className='mr-3 w-[2.0625rem] flex-none overflow-hidden md:w-auto '>
                  <Logo className='h-8 w-auto text-2xl' width='auto' />
                </a>
              </div>
            </div>
          </div>
        </div>
        <TabbableMenu />
        <div className='mx-auto max-w-6xl p-5 px-4 sm:px-6 md:px-8'>
          {children}
        </div>
      </div>
    </>
  );
};

export default CustomerLayout;
