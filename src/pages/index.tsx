import * as React from 'react';
import { useEffect } from 'react';

import TalkDemo from '@/components/home/TalkDemo';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

/* eslint-disable prefer-rest-params */
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  useEffect(() => {
    (function (w, d, s, o, f, js, fjs) {
      w['talk2me_widget'] = o;
      w[o] =
        w[o] ||
        function () {
          (w[o].q = w[o].q || []).push(arguments);
        };
      (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
      js.id = o;
      js.src = f;
      js.async = 1;
      fjs.parentNode.insertBefore(js, fjs);
    })(window, document, 'script', 'mw', 'http://localhost:8080/widget.js');
    mw('init', {
      default: { subject: 'Contact us today' },
      customer: { domain: 'http://localhost:3000' },
    });
  }, []);
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout mt-10 min-h-screen text-center'>
            <div className='mb-10'>
              <TalkDemo />
            </div>
            <h1 className='aos text-3xl font-bold leading-tight tracking-tight md:text-6xl'>
              Connect with Customers
            </h1>
            <div className='flex justify-center'>
              <p className='mb-8 mt-3 w-1/2 leading-6 text-opacity-70'>
                Talkio supercharges your sales by facilitating communication
                with your customers.
              </p>
            </div>

            <div>
              <ArrowLink className='mr-10' href='/login'>
                Login
              </ArrowLink>
              <ButtonLink href='/components' variant='light'>
                Get Started
              </ButtonLink>
            </div>
            <footer className='bottom-2 pt-40 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://ade.com'>Ade</UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
