export interface IPublisherResponse {
  id: number;
  name: string;
  logo: string;
}

export interface ICreatePublisherDto {
  name: string;
  logo: File;
}

export interface IUpdatePublisherDto {
  name: string;
  logo?: File;
}
