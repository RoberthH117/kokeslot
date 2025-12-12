import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffiliateStatsService {

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) {
    const end = "2025-10-10"
const start = "2025-11-10"
  }

getStats(startDate: string, endDate: string): Observable<any[]> {
  const url = `${this.env.apiValidate}/api/affiliate/leaderboard`;

  return this.http.get<any[]>(url, {
    params: {
      startDate,
      endDate,
      categories: "slots"
    }
  });
}



}