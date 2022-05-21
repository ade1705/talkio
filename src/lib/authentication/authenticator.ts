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
    await signInWithEmailLink(auth, email, this.location);
    // .then(() => {
    //     //use provider to save isAuth with the email
    // })
    // .catch((error) => {
    //     console.error({ error });
    //     //also delete from local storage
    //     //ToDO: unable to authenticate for some reason, should show an error
    // });
  };
}

export default Authenticator;
