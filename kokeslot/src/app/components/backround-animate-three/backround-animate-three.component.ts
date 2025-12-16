import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';


interface TreeParticle {
  i: number;
  cx: number;
  cy: number;
  r: number;
  dot: number;
  prog: number;
  s: number;
  t?: gsap.core.Timeline;
}

interface SnowParticle {
  x: number;
  y: number;
  i: number;
  s: number;
  a: number;
  t?: gsap.core.Tween;
}

@Component({
  selector: 'app-backround-animate-three',
  templateUrl: './backround-animate-three.component.html',
  styleUrls: ['./backround-animate-three.component.css']
})
export class BackroundAnimateThreeComponent implements AfterViewInit {
  @ViewChild('canvasTree', { static: true })
  canvasTree!: ElementRef<HTMLCanvasElement>;

  @ViewChild('canvasSnow', { static: true })
  canvasSnow!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private ctx2!: CanvasRenderingContext2D;

  private cw = 4000;
  private ch = 4000;
  private T = Math.PI * 2;

  private treeParticles: TreeParticle[] = [];
  private snowParticles: SnowParticle[] = [];

  private mouse = { x: this.cw / 2, y: 0 };
  private xTo = gsap.quickTo(this.mouse, 'x', { duration: 1.5, ease: 'expo' });
  private yTo = gsap.quickTo(this.mouse, 'y', { duration: 1.5, ease: 'expo' });

  ngAfterViewInit(): void {
    this.initCanvas();
    this.createParticles();
    this.bindMouse();
    gsap.ticker.add(() => this.render());
    this.intro();
  }

  private initCanvas() {
    const c = this.canvasTree.nativeElement;
    const c2 = this.canvasSnow.nativeElement;

    c.width = c.height = this.cw;
    c2.width = c2.height = this.cw;

    this.ctx = c.getContext('2d')!;
    this.ctx2 = c2.getContext('2d')!;

    this.ctx.fillStyle = this.ctx2.fillStyle = '#fff';
    this.ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    this.ctx.globalCompositeOperation = 'lighter';
  }

  private bindMouse() {
    this.canvasTree.nativeElement.addEventListener('pointermove', (e) => {
      const rect = this.canvasTree.nativeElement.getBoundingClientRect();
      const scaleX = this.cw / rect.width;
      const scaleY = this.ch / rect.height;

      this.xTo((e.clientX - rect.left) * scaleX);
      this.yTo((e.clientY - rect.top) * scaleY);
    });
  }

  private createParticles() {
    for (let i = 0; i < 999; i++) {
      const tree: TreeParticle = {
        i,
        cx: this.cw / 2,
        cy: gsap.utils.mapRange(0, 999, 600, 3700, i),
        r: i < 900 ? gsap.utils.mapRange(0, 999, 3, 770, i) : 50,
        dot: 9,
        prog: 0.25,
        s: 1,
      };

      const d = 99;
      tree.t = gsap
        .timeline({ repeat: -1 })
        .to(tree, { duration: d, prog: '+=1', ease: 'slow(0.3,0.4)' })
        .to(tree, { duration: d / 2, s: 0.15, repeat: 1, yoyo: true }, 0)
        .seek(Math.random() * d);

      this.treeParticles.push(tree);

      const snow: SnowParticle = {
        x: this.cw * Math.random(),
        y: -9,
        i,
        s: 3 + 5 * Math.random(),
        a: 0.1 + 0.5 * Math.random(),
      };

      snow.t = gsap
        .to(snow, { y: this.ch, repeat: -1, ease: 'none' })
        .seek(Math.random() * 99)
        .timeScale(snow.s / 700);

      this.snowParticles.push(snow);
    }
  }

  private render() {
    this.ctx.clearRect(0, 0, this.cw, this.ch);
    this.ctx2.clearRect(0, 0, this.cw, this.ch);

    this.treeParticles.forEach((p) => this.drawTree(p));
    this.snowParticles.forEach((p) => this.drawSnow(p));
  }

  private drawTree(p: TreeParticle) {
    const angle = p.prog * this.T;
    const x = Math.cos(angle) * p.r + p.cx;
    const y = Math.sin(angle) * p.r * 0.2 + p.cy;
    const d = Math.hypot(x - this.mouse.x, y - this.mouse.y);
    const ms = gsap.utils.clamp(0.07, 1, d / this.cw);

    this.ctx.beginPath();
    this.ctx.arc(x, y, (p.dot * p.s) / 2 / ms, 0, this.T);
    this.ctx.fill();
    this.ctx.lineWidth = (p.dot * p.s * 2) / ms;
    this.ctx.stroke();
  }

  private drawSnow(p: SnowParticle) {
    const ys = gsap.utils.interpolate(1.3, 0.1, p.y / this.ch);

    this.ctx2.save();
    this.ctx2.translate(p.x, p.y);
    this.ctx2.rotate(50 * (p.t?.progress() ?? 0));
    this.ctx2.globalAlpha = p.a * ys;

    this.ctx2.beginPath();
    this.ctx2.arc(
      gsap.utils.interpolate(-55, 55, p.i / 999),
      gsap.utils.interpolate(-25, 25, p.i / 999),
      p.s * ys,
      0,
      this.T
    );
    this.ctx2.fill();
    this.ctx2.restore();
  }

  private intro() {
    gsap.from(this.treeParticles, {
      duration: 1,
      dot: 0,
      ease: 'back.out(9)',
      stagger: -0.0009,
    });

    gsap.from(this.mouse, {
      duration: 1.5,
      y: this.ch * 1.2,
      ease: 'power2.inOut',
    });
  }
}