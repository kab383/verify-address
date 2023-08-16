import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../secret-environments/environment.secret';

@Injectable({
  providedIn: 'root'
})
export class UspsApiService {
  private apiUrl = 'https://secure.shippingapis.com/ShippingAPI.dll?';
  private userId = environment.userId;

  constructor(private http: HttpClient) { }

  verifyAddress(address1: string, address2: string, city: string, state: string, zip5: string): Observable<any> {
    const xmlPayload = `<AddressValidateRequest USERID="${this.userId}">
                        <Revision>1</Revision>
                        <Address ID="0">
                        <FirmName></FirmName>
                        <Address1>${address1}</Address1>
                        <Address2>${address2}</Address2>
                        <City>${city}</City>
                        <State>${state}</State>
                        <Urbanization></Urbanization>
                        <Zip5>${zip5}</Zip5>
                        <Zip4></Zip4>
                        </Address>
                        </AddressValidateRequest>`;

                      // Headers in this instance are similar to labels. They are telling the API what information I'm sending, and how it is formatted.
                      // This lets the API know exactly what to expect when I send it a request.
                      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

                      return this.http.post(this.apiUrl, `API=Verify&XML=${xmlPayload}`, { headers, responseType: 'text' });
                    };
}
