import { Injectable } from '@angular/core';

declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  
  apiStats: string = window.__env.API_STATS;
  apiValidate: string = window.__env.API_VALIDATE;
}
