import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

interface ValidacionResponse {
  isAffiliate: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AffiliateValidateService {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) {
    
  }

validateUser(username: string) {
  return this.http.get("https://kokeslot-backend.onrender.com/api/affiliate/validateUser", {
    params: { username }
  });
}

  }