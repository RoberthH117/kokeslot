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

cargarStats() {
  const end = new Date().toISOString();
  const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  this.statsService.getStats(start, end).subscribe((res: any[]) => {
    // Ordenar por apuesta mayor
    const sorted = res.sort((a, b) => b.wagered - a.wagered);

    this.top3 = sorted.slice(0, 3);
    this.leaderboard = sorted.slice(3);
  });
}

startCountdown() {
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  setInterval(() => {
    const diff = endOfMonth.getTime() - new Date().getTime();

    this.countdown.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.countdown.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    this.countdown.minutes = Math.floor((diff / (1000 * 60)) % 60);
    this.countdown.seconds = Math.floor((diff / 1000) % 60);
  }, 1000);
}

}
