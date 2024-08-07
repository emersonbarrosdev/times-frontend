import { IUser } from './iuser';

export interface IAuthResponse {
  token: string;
  user: IUser;
}
