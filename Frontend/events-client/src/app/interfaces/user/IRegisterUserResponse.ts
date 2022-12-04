export interface IRegisterUserResponse {
  registerationStatus: number;
  errors: string[];
  token: string;
  role: string;
  username: string;
}
