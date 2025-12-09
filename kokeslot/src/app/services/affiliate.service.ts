import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ValidacionResponse {
  isAffiliate: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  private baseUrl = 'https://roobet.com/_api';
  private affiliateId = 'Kokeslots'; // Aquí pones tu ID de Coqueslot


  constructor(private http: HttpClient) {}

  validarUsuario(username: string): Observable<ValidacionResponse> {


    const params = {
      username,
      affiliateId: this.affiliateId,
      userId: '' // opcional, si no tienes userId
    };

    return this.http.get<ValidacionResponse>(`${this.baseUrl}/affiliate/validateUser`, { params });
  }
}
