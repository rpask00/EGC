import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  texto = 'Wenceslau Braz - Cuidado com as cargas';
  lat = 50.05345156644511;
  lng = 21.615080465560913;
  zoom = 12;

  constructor() {}

  ngOnInit() {}
}
