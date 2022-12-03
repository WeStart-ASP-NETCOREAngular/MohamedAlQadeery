export interface ILoginResponseDto {
  loginStatus: number;
  loggedInSuccessfully: boolean;
  error: string;
  token: string;
  username: string;
  role: string;
}
