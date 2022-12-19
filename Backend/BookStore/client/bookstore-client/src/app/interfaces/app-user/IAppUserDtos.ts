export interface IAppUserResponse {
  id: number;
  userName: string;
}

export interface ICreateAppUserDto {
  userName: string;
}

export interface IUpdateAppUserDto {
  userName: string;
}

export interface IInfoResponse {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
}
