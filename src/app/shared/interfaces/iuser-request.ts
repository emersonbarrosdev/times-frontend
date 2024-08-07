export interface IUserCreateRequest {
  username: string;
  password: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}
