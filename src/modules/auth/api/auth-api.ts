import { Auth_SignupByPassword_PostBody } from '@api/auth/signupByPassword';
import { firebaseApp } from '@lib/firebase';
import { hasCode } from '@utils/validate-utils';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { SigninFormValues } from '..';

const api = axios.create({ baseURL: '/api/auth' });
const auth = getAuth(firebaseApp);
export class AuthApi {
  static async signupByPassword(data: Auth_SignupByPassword_PostBody) {
    await api.post('/signupByPassword', data);
  }

  static async signinByPassword(data: SigninFormValues) {
    return signInWithEmailAndPassword(auth, data.email, data.password);
  }

  static async signout() {
    await signOut(auth);
  }

  static getAuthErrorMessage(error: unknown) {
    if (!hasCode(error)) return 'Fail to sign in';

    switch (error.code) {
      case 'auth/too-many-requests':
      case 'auth/user-disabled':
        return 'User is disabled';

      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Username or password is incorrect';

      default:
        return 'Fail to sign in';
    }
  }
}
