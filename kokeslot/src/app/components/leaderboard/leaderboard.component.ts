import { Component } from '@angular/core';
import { AffiliateStatsService } from 'src/app/services/affiliate-stats.service';
import { AffiliateValidateService } from 'src/app/services/affiliate.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
stats: any = null;
  usuario: string = "";
  resultado: boolean | null = null;
  private active = true;
countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

leaderboard: any[] = [];
top3: any[] = [];
   constructor(
    private statsService: AffiliateStatsService,
   
  ) {}  

ngOnInit() {
  this.startCountdown();
  this.cargarStats();
}

// getCurrentPeriod() {
//   const today = new Date();
//   let start: Date;
//   let end: Date;

//   const day = today.getDate();

//   if (day >= 15) {
//     // Estamos en el ciclo 15 del mes actual → 14 del mes siguiente
//     start = new Date(today.getFullYear(), today.getMonth(), 15, 0, 0, 0);
//     end = new Date(today.getFullYear(), today.getMonth() + 1, 14, 23, 59, 59);
//   } else {
//     // Estamos en el ciclo 15 del mes anterior → 14 del mes actual
//     start = new Date(today.getFullYear(), today.getMonth() - 1, 15, 0, 0, 0);
//     end = new Date(today.getFullYear(), today.getMonth(), 14, 23, 59, 59);
//   }

//   return {
//     startISO: start.toISOString(),
//     endISO: end.toISOString(),
//   };
// }


getCurrentPeriod() {
  const today = new Date();
  let start: Date;
  let end: Date;

  const day = today.getDate();
  const year = today.getFullYear();
  const month = today.getMonth();

  if (day >= 15) {
    // 15 del mes actual → 14 del mes siguiente
    start = new Date(Date.UTC(year, month, 15, 0, 0, 0));
    end   = new Date(Date.UTC(year, month + 1, 14, 23, 59, 59));
  } else {
    // 15 del mes anterior → 14 del mes actual
    start = new Date(Date.UTC(year, month - 1, 15, 0, 0, 0));
    end   = new Date(Date.UTC(year, month, 14, 23, 59, 59));
  }

  return {
    startISO: start.toISOString(),
    endISO: end.toISOString(),
  };
}

cargarStats() {
const { startISO, endISO } = this.getCurrentPeriod();

  this.statsService.getStats(startISO, endISO).subscribe((res: any[]) => {
    // Ordenar por apuesta mayor
    const sorted = res.sort((a, b) => b.weightedWagered - a.weightedWagered);

    this.top3 = sorted.slice(0, 3);
    this.leaderboard = sorted.slice(3);
  });
}

// startCountdown() {
//   const now = new Date();
//   const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

//   setInterval(() => {
//     const diff = endOfMonth.getTime() - new Date().getTime();

//     this.countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     this.countdown.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     this.countdown.minutes = Math.floor((diff / (1000 * 60)) % 60);
//     this.countdown.seconds = Math.floor((diff / 1000) % 60);
//   }, 1000);
// }


startCountdown() {
  const now = new Date();
  let end: Date;

  const day = now.getDate();

  if (day >= 15) {
    // Cuenta regresiva al 14 del mes siguiente
    end = new Date(now.getFullYear(), now.getMonth() + 1, 14, 23, 59, 59);
  } else {
    // Cuenta regresiva al 14 del mes actual
    end = new Date(now.getFullYear(), now.getMonth(), 14, 23, 59, 59);
  }

  setInterval(() => {
    const diff = end.getTime() - new Date().getTime();

    this.countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.countdown.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    this.countdown.minutes = Math.floor((diff / (1000 * 60)) % 60);
    this.countdown.seconds = Math.floor((diff / 1000) % 60);
  }, 1000);
}

ngOnDestroy() {
  this.active = false;
}



}
