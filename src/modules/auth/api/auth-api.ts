import { Auth_SignupByPassword_PostBody } from '@api/auth/signupByPassword';
import axios from 'axios';

const api = axios.create({ baseURL: '/api/auth' });

export class AuthApi {
  static async signupByPassword(data: Auth_SignupByPassword_PostBody) {
    await api.post('/signupByPassword', data);
  }
}
