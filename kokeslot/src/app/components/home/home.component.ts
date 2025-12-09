import { Component } from '@angular/core';
import { AffiliateService } from 'src/app/services/affiliate.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  usuarioInput: string = '';
  resultadoValidacion: boolean | null = null;

  // Esto lo podrías determinar con tu lógica de login o rol
  esStreamer: boolean = true; // true si es el streamer, false si es usuario normal

  constructor(private affiliateService: AffiliateService) {}

validarUsuario() {
  if (!this.usuarioInput.trim()) return;

  this.affiliateService.validarUsuario(this.usuarioInput.trim())
    .subscribe(res => {
      this.resultadoValidacion = res.isAffiliate;
    }, err => {
      console.error('Error al validar usuario', err);
      this.resultadoValidacion = false;
    });
}
}
