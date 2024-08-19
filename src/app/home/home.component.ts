import {Component, ElementRef, NgZone, OnInit, ViewChild,} from "@angular/core";
import {backGround, ColorRGB, Wave} from "../MODELS/wave.model";
import {Router} from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit{
  @ViewChild("canvas", { read: ElementRef, static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild("signupbox", { read: ElementRef }) signupbox: ElementRef;
  private ctx: CanvasRenderingContext2D;
  previousScrollPos = 5000;
  scrollLock: boolean = false;
  amplidute: number = 0;
  gui;

  wave: Wave = {
    y: 573,
    length: 100,
    amplitude: 27,
    frequency: 0.02
  };

  color: ColorRGB = {
    r: 100,
    g: 0,
    b: 255,
    a: 1
  };

  backGround: backGround = {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  };

  increment: number;
  constructor(private ngZone: NgZone, private router: Router) {
    this.increment = this.wave.frequency;
    // this.gui = new dat.GUI();
    // const waveFolder = this.gui.addFolder('wave')
    // waveFolder.add(this.wave, 'y', 0, innerHeight)
    // waveFolder.add(this.wave, 'length', -200, 200)
    // waveFolder.add(this.wave, 'amplitude', -300, 300)
    // waveFolder.add(this.wave, 'frequency', -0.01, 0.2)

    // waveFolder.open()

    // const colorFolder = this.gui.addFolder('color')
    // colorFolder.add(this.color, 'r', 0, 255)
    // colorFolder.add(this.color, 'g', 0, 255)
    // colorFolder.add(this.color, 'b', 0, 255)
    // colorFolder.add(this.color, 'a', 0, 1)

    // colorFolder.open()

    // const bgcFolder = this.gui.addFolder('background')
    // bgcFolder.add(this.backGround, 'r', 0, 255)
    // bgcFolder.add(this.backGround, 'g', 0, 255)
    // bgcFolder.add(this.backGround, 'b', 0, 255)
    // bgcFolder.add(this.backGround, 'a', 0, 1)

    // bgcFolder.open()
  }


  ngOnInit() {
    this.animate.call(this);
    // this.drawImage()
    addEventListener("resize", () => {
      this.canvas.nativeElement.width = innerWidth + 400;
      this.canvas.nativeElement.height = innerHeight;
    });
    this.canvas.nativeElement.width = innerWidth;
    this.canvas.nativeElement.height = innerHeight;

  }


  wobble() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.ctx.beginPath();
    this.ctx.moveTo(0, innerHeight / 2);
    for (let i = -100; i < innerWidth; i++) {
      this.ctx.lineTo(
        i,
        this.wave.y +
        Math.sin(i / this.wave.length + this.increment) *
        this.wave.amplitude *
        Math.sin(this.increment)
      );
    }


    this.ctx.strokeStyle = `rgb(
        ${this.color.r * Math.sin(this.increment)},
        ${this.color.g},
        ${this.color.b},
        ${this.color.a})`;

    this.ctx.fillStyle = `rgba(
          ${this.backGround.r},
          ${this.backGround.g},
          ${this.backGround.b},
          ${this.backGround.a * Math.abs(Math.sin(this.increment)) * 0.2 +
      0.1})`;
    this.ctx.stroke();
  }

  animate() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    // this.drawImage()
    this.ctx.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.ctx.fillStyle = `rgba(
      ${this.backGround.r},
      ${this.backGround.g},
      ${this.backGround.b},
      ${this.backGround.a})`;
    this.wobble();

    const id = requestAnimationFrame(this.animate.bind(this));
    this.increment += this.wave.frequency;
  }

  scroll() {
    this.signupbox.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}
