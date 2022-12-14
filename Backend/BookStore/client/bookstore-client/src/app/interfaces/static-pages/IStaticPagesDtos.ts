export interface IStaticPageResponse {
  id: number;
  pageName: string;
  details: string;
}

export interface ICreateStaticPageDto {
  pageName: string;
  details: string;
}

export interface IUpdateStaticPageDto {
  pageName: string;
  details: string;
}
