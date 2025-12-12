import { Injectable } from '@angular/core';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  apiKey: string = window.__env.API_KEY;
  uid: string = window.__env.AFFILIATE_UID;

  apiStats: string = window.__env.API_STATS;
  apiValidate: string = window.__env.API_VALIDATE;
}
