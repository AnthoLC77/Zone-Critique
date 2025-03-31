import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Media } from '../../models/media.model';
import { SliderComponent } from '../../shared/slider/slider.component';

@Component({
  selector: 'app-nouveaute',
  imports: [HeaderComponent, SliderComponent],
  templateUrl: './nouveaute.component.html',
  styleUrl: './nouveaute.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NouveauteComponent implements OnInit {

  media : Media[] = [];

  ngOnInit(): void {
    
  }

  getMedia() {

  } 
}
