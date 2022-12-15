export interface IContactusResponse {
  id: number;
  email: string;
  fullName: string;
  message: string;
  readAt: Date;
  createdAt: Date;
}

export interface ICreateContactusDto {
  email: string;
  fullName: string;
  message: string;
}

export interface IUpdateContactusDto {
  email: string;
  fullName: string;
  message: string;
}
