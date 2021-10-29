import { fireAuth, firestore } from '@lib/firebase/firebase';
import { auth } from 'firebase-admin';
import { SignupFormValues } from '../components/SignupForm/signup-form-schema';

const profileCollection = firestore.collection('user-profile');
const actionCodeSettings: auth.ActionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${process.env['DOMAIN']}/user/me`,
  // This must be true.
  handleCodeInApp: true,
};

export class AuthService {
  static async signUpByPassword(data: SignupFormValues) {
    const user = await fireAuth.createUser({
      email: data.email,
      password: data.password,
      displayName: data.displayName,
      disabled: true,
      emailVerified: false,
    });

    await profileCollection.doc(user.uid).create({
      id: user.uid,
    });

    await fireAuth.generateEmailVerificationLink(
      data.email,
      actionCodeSettings
    );
  }
}
