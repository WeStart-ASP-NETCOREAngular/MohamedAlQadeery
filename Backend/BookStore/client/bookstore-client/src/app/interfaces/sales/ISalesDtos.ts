import { IAppUserResponse } from '../app-user/IAppUserDtos';
import { IBookResponse } from '../book/IBookResponse';

export interface ISalesResponse {
  id: number;
  book: IBookResponse;
  appUser: IAppUserResponse;
  amount: number;
  totalPrice: number;
  orderDate: Date;
}

export interface ICreateSalesDto {
  book: IBookResponse;
  appUser: IAppUserResponse;
  amount: number;
  totalPrice: number;
}

export interface IUpdateSalesDto {
  book: IBookResponse;
  appUser: IAppUserResponse;
  amount: number;
  totalPrice: number;
}
