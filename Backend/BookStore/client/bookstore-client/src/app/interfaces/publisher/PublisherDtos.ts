export interface IPublisherResponse {
  id: number;
  name: string;
  logo: string;
}

export interface ICreatePublisherDto {
  name: string;
}

export interface IUpdatePublisherDto {
  name: string;
}
