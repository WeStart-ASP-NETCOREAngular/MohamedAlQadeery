import { IZoneResponse } from '../zone/IZoneDtos';

export interface IAddressResponse {
  id: number;
  address1: string;
  address2?: string;
  postalCode: string;
  zone: IZoneResponse;
}

export interface ICreateAddressDto {
  address1: string;
  address2?: string;
  postalCode: string;
  zoneId: number;
}

export interface IUpdateAddressDto {
  address1: string;
  address2?: string;
  postalCode: string;
  zoneId: number;
}
