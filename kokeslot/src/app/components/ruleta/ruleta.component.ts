import { Component, AfterViewInit } from '@angular/core';
import { AffiliateValidateService } from 'src/app/services/affiliate.service';

declare var Winwheel: any;
declare var gsap: any; // usamos gsap ahora

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements AfterViewInit {

    constructor(
         private validateService: AffiliateValidateService,
    ){
  
  }
  showWinnerModal = false;
public ganadorNombre: string = '';
 usuario: string = "";
 resultado: boolean | null = null;

  usuarios: string[] = [];
  historial: string[] = [];
  ganador: string | null = null;

  nuevoUsuario = "";
  usuariosPegados = "";

  rueda: any;
  girando = false;



  ngAfterViewInit() {
    this.generarRuleta();
  }

  generarRuleta() {
    let segmentos;

    if (this.usuarios.length === 0) {
      // ruleta vacía con 6 colores de ejemplo
      segmentos = [
        { text: "", fillStyle: "#ff0044" },
        { text: "", fillStyle: "#00ffcc" },
        { text: "", fillStyle: "#9933ff" },
        { text: "", fillStyle: "#ff8800" },
        { text: "", fillStyle: "#00ff44" },
        { text: "", fillStyle: "#0099ff" }
      ];
    } else {
      segmentos = this.usuarios.map((u, i) => ({
        text: u,
        fillStyle: this.obtenerColor(i)
      }));
    }

    this.rueda = new Winwheel({
      canvasId: 'ruletaCanvas',
      numSegments: segmentos.length,
      segments: segmentos,
      rotationAngle: 0,
      animation: {
        type: 'spinToStop',
        duration: 4,
        spins: 8,
        callbackFinished: (segment: any) => this.obtenerGanador(segment)
      }
    });
  }

  obtenerColor(i: number) {
    const colores = [
      "#ff0044", "#00ffcc", "#9933ff", "#ff8800",
      "#00ff44", "#0099ff", "#ff00cc", "#33ff00"
    ];
    return colores[i % colores.length];
  }

  agregarUsuario() {
    const u = this.nuevoUsuario.trim();
    if (u && !this.usuarios.includes(u)) {
      this.usuarios.push(u);
      this.generarRuleta();
    }
    this.nuevoUsuario = "";
  }

  agregarVarios() {
    const lista = this.usuariosPegados
      .split("\n")
      .map(x => x.trim())
      .filter(x => x && !this.usuarios.includes(x));

    this.usuarios.push(...lista);
    this.usuariosPegados = "";
    this.generarRuleta();
  }

  eliminarUsuario(i: number) {
    this.usuarios.splice(i, 1);
    this.generarRuleta();
  }

girarRuleta() {
  if (this.girando || this.usuarios.length < 2) return;

  this.girando = true;
  this.rueda.stopAnimation(false);
  this.rueda.rotationAngle = 0;

  // Establecer un intervalo para checar cuando la rueda deja de girar
  const checkRueda = setInterval(() => {
    if (!this.rueda.animation) { // la animación terminó
      this.obtenerGanador(this.rueda.getIndicatedSegment());
      clearInterval(checkRueda);
    }
  }, 50);

  this.rueda.startAnimation();
}


  obtenerGanador(segmento: any) {
    this.ganador = segmento.text;

    if (this.ganador) {
      this.historial.unshift(this.ganador);
      this.usuarios = this.usuarios.filter(x => x !== this.ganador);
       this.ganadorNombre = this.ganador; // aquí ya tienes el nombre que sale en la ruleta
    }

    this.girando = false;
   
this.showWinnerModal = true;
    this.generarRuleta();
  }
  cerrarModal() {
  this.showWinnerModal = false;
}


  confirmar() {
    this.ganador = null;
  }

  cancelar() {
    this.ganador = null;
  }

  limpiarRuleta() {
  this.usuarios = [];
  this.historial = [];
  this.generarRuleta();
}



  validar() {
    if (!this.usuario.trim()) return;

    this.validateService.validateUser(this.usuario)
      .subscribe((res: any) => {
        this.resultado = res.isAffiliate; 
      });
  }

}
