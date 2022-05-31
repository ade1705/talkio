import { useRouter } from 'next/router';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';

import Authenticator from '@/lib/authentication/authenticator';

import Loading from '@/components/Loading';
import Seo from '@/components/Seo';

import { userContext } from '@/context/user-context';

import Logo from '~/svg/logo.svg';

enum AuthStatus {
  Login = 'login',
  Register = 'register',
  EmailSent = 'email_sent',
}
const copy = {
  [AuthStatus.Login]: {
    title: 'Login',
    message:
      'Welcome to talkio, please login to the product to get started. Provide your email and the link to login will be sent to your email',
    alt_text: "Don't have an account?",
    alt_action: 'Sign up',
  },
  [AuthStatus.Register]: {
    title: 'Get Started',
    message:
      'Welcome to talkio, please register to to get started. Provide your email and the link to login will be sent to your email',
    alt_text: "Don't have an account?",
    alt_action: 'Login',
  },
  [AuthStatus.EmailSent]: {
    title: 'Email Sent',
    message:
      'The link to login has been sent to your email, click on it to login. If it is not in your inbox, please check your spam messages.',
    alt_text: '',
    alt_action: '',
  },
};
const GetStarted = () => {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(AuthStatus.Login);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toggleState = () =>
    authStatus === AuthStatus.Login ? AuthStatus.Register : AuthStatus.Login;
  const user = useContext(userContext);
  const authenticator = new Authenticator(user);
  useEffect(() => {
    const auth = async () => {
      if (!window.location.href.includes('apiKey')) {
        return;
      }
      await authenticator.checkLogin(
        window.localStorage.getItem('email') ?? ''
      );
      return router.push('customer/dashboard');
    };
    auth()
      .then((_) => {
        window.localStorage.setItem('isAuth', 'true');
        // router.push('/customer/dashboard');
      })
      .catch(console.error); // eslint-disable-line no-console
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const continueAuth = async () => {
    try {
      setError('');
      setIsLoading(true);
      await authenticator.authenticate(email);
      setAuthStatus(AuthStatus.EmailSent);
      window.localStorage.setItem('email', email);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Seo />
      <div className='flex h-screen w-full flex-row'>
        <div className='flex w-full basis-1/2 items-center justify-center'>
          <div className='w-96'>
            <Loading isLoading={isLoading} />
            <div className={`${isLoading && `hidden`}`}>
              <Logo className='text-8xl' />
              <h2 className='mb-4 pt-0 font-bold'>{copy[authStatus].title}</h2>
              <p className='text-sm text-neutral-500'>
                {copy[authStatus].message}
              </p>
              {authStatus !== AuthStatus.EmailSent && (
                <div>
                  <div className='mt-6 mb-4'>
                    <label
                      htmlFor='email'
                      className='mb-2 block text-sm font-medium'
                    >
                      Your email
                    </label>
                    <input
                      type='email'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full rounded-sm border border-gray-300 text-sm text-gray-900 focus:border-gray-300 ${
                        error !== '' && `border-red-700 bg-red-100`
                      }`}
                      placeholder='email@email.com'
                      required
                    />
                    {error !== '' && (
                      <p className='text-sm font-medium text-red-700'>
                        {error}
                      </p>
                    )}
                  </div>
                  <input
                    type='button'
                    value='Continue'
                    onClick={continueAuth}
                    className='inline-block cursor-pointer rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
                  />
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <p className='mt-8 text-sm text-neutral-500'>
                    {copy[authStatus].alt_text}{' '}
                    <a
                      className='cursor-pointer font-medium text-blue-600'
                      onClick={() => setAuthStatus(toggleState())}
                    >
                      {copy[authStatus].alt_action}
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex w-full basis-1/2 items-center justify-end bg-neutral-100'>
          02
        </div>
      </div>
    </>
  );
};

export default GetStarted;
