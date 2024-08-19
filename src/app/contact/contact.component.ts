import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  texto: string = 'Wenceslau Braz - Cuidado com as cargas';
  lat: number = 50.05345156644511;
  lng: number = 21.615080465560913;
  zoom: number = 12;

  constructor() { }

  ngOnInit() { }

}
