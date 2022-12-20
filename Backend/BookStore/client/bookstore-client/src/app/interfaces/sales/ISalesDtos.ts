import { IAppUserResponse } from '../app-user/IAppUserDtos';
import { IBookResponse } from '../book/IBookResponse';

export interface ISalesResponse {
  id: number;
  book: IBookResponse;
  appUser: IAppUserResponse;
  amount: number;
  totalPrice: number;
  orderDate: Date;
  status: SalesStatus;
  soldDate?: Date;
}

export interface ICreateSalesDto {
  bookId: number;
  appUserId: number;
  amount: number;
  totalPrice: number;
}

export interface IUpdateSalesDto {
  bookId: number;
  appUserId: number;
  amount: number;
  totalPrice: number;
}

export enum SalesStatus {
  PENDING,
  SOLD,
  CANCELED,
}
