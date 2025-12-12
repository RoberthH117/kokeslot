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
  return this.http.get("https://localhost:44346/api/affiliate/validateUser", {
    params: { username }
  });
}

  }