import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateZoneDto,
  IUpdateZoneDto,
  IZoneResponse,
} from '../interfaces/zone/IZoneDtos';

@Injectable({
  providedIn: 'root',
})
export class ZonesService {
  private baseUrl = environment.baseURL + '/api/zone';

  constructor(private _http: HttpClient) {}

  public GetAllZones() {
    return this._http.get<IZoneResponse[]>(this.baseUrl);
  }

  public GetZoneById(id: number) {
    return this._http.get<IZoneResponse>(`${this.baseUrl}/${id}`);
  }

  public CreateZone(zone: ICreateZoneDto) {
    return this._http.post<IZoneResponse>(this.baseUrl, zone);
  }

  public UpdateZone(zone: IUpdateZoneDto, id: number) {
    return this._http.put<IZoneResponse>(`${this.baseUrl}/${id}`, zone);
  }

  public DeleteZone(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
}
