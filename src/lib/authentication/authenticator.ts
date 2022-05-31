import {
  Auth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from 'firebase-config';

import { User } from '@/context/user-context';

class Authenticator {
  private auth: Auth;
  customer = {};
  private user: User;
  private location = '';

  constructor(user: User) {
    this.auth = auth;
    this.user = user;
    if (typeof window !== 'undefined') {
      this.location = window.location.href;
    }
  }

  authenticate = async (email: string) => {
    const actionCodeSettings = {
      url: 'http://localhost:3000/get-started',
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
  };

  checkLogin = async (email: string) => {
    if (!isSignInWithEmailLink(auth, this.location)) {
      return;
    }
    if (email === '') {
      throw new Error('email not found');
    }
    try {
      const response = await signInWithEmailLink(auth, email, this.location);
      window.sessionStorage.setItem('userFireBaseId', response.user.uid);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  getUserId = (): string => {
    const userFirebaseId = window.sessionStorage.getItem('userFirebaseId');
    if (userFirebaseId === null) {
      throw new Error('User not logged In');
    }
    return userFirebaseId;
  };
}

export default Authenticator;
