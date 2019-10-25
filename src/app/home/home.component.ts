import { Component, OnInit, ElementRef, ViewChild, NgZone, ViewContainerRef } from '@angular/core';
import * as dat from 'dat.gui'
import { Wave, Color, backGround, ColorRGB } from '../MODELS/wave.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('canvas', { read: ElementRef }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  amplidute: number = 0;
  gui;
  wave: Wave = {
    y: 500,
    length: 100,
    amplitude: 100,
    frequency: 0.02,
  }

  color: ColorRGB = {
    r: 100,
    g: 0,
    b: 50,
    a: 1,
  }

  backGround: backGround = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }

  increment: number;
  constructor(private ngZone: NgZone) {
    this.gui = new dat.GUI();
    this.increment = this.wave.frequency;

    const waveFolder = this.gui.addFolder('wave')
    waveFolder.add(this.wave, 'y', 0, innerHeight)
    waveFolder.add(this.wave, 'length', -200, 200)
    waveFolder.add(this.wave, 'amplitude', -300, 300)
    waveFolder.add(this.wave, 'frequency', -0.01, 0.2)

    waveFolder.open()

    const colorFolder = this.gui.addFolder('color')
    colorFolder.add(this.color, 'r', 0, 255)
    colorFolder.add(this.color, 'g', 0, 255)
    colorFolder.add(this.color, 'b', 0, 255)
    colorFolder.add(this.color, 'a', 0, 1)

    colorFolder.open()


    const bgcFolder = this.gui.addFolder('background')
    bgcFolder.add(this.backGround, 'r', 0, 255)
    bgcFolder.add(this.backGround, 'g', 0, 255)
    bgcFolder.add(this.backGround, 'b', 0, 255)
    bgcFolder.add(this.backGround, 'a', 0, 1)

    bgcFolder.open()
  }

  ngOnInit() {
    this.animate.call(this)
    // this.drawImage()
    addEventListener('resize', () => {
      this.canvas.nativeElement.width = innerWidth * 2;
      this.canvas.nativeElement.height = innerHeight * 2;
    })
    this.canvas.nativeElement.width = innerWidth * 2;
    this.canvas.nativeElement.height = innerHeight * 2;
  }

  wobble() {
    this.ctx = this.canvas.nativeElement.getContext('2d')
    this.ctx.beginPath()
    this.ctx.moveTo(0, innerHeight / 2)
    for (let i = -100; i < innerWidth; i++) {
      this.ctx.lineTo(i, this.wave.y + Math.sin(i / this.wave.length + this.increment) * this.wave.amplitude * Math.sin(this.increment))
    }

    // this.ctx.strokeStyle = `hsla(
    //   ${this.color.h * Math.sin(this.increment)},
    //   ${this.color.s}%,
    //   ${this.color.l}%,
    //   ${this.color.a})`

    this.ctx.strokeStyle = `rgb(
        ${this.color.r * Math.sin(this.increment)},
        ${this.color.g},
        ${this.color.b},
        ${this.color.a})`

    this.ctx.fillStyle = `rgba(
          ${this.backGround.r},
          ${this.backGround.g},
          ${this.backGround.b},
          ${this.backGround.a * Math.abs(Math.sin(this.increment)) * .2 + 0.1})`
    this.ctx.stroke()

  }

  animate() {
    this.ctx = this.canvas.nativeElement.getContext('2d')
    // this.drawImage()
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width + 200, this.canvas.nativeElement.height)
    this.ctx.fillStyle = `rgba(
      ${this.backGround.r},
      ${this.backGround.g},
      ${this.backGround.b},
      ${this.backGround.a})`
    this.wobble();

    const id = requestAnimationFrame(this.animate.bind(this));
    this.increment += this.wave.frequency;
  }
}




