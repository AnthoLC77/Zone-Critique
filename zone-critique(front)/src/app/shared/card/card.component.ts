import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, signal } from '@angular/core';
import { Media } from '../../models/media.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as faSolidHeart, faEye as faRegularEye} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faEye } from '@fortawesome/free-regular-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-card',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardComponent implements OnInit  {
  @Input() media!: Media;
  @Input() review!: Review | undefined;
  faEye = faEye;
  faRegularEye = faRegularEye;
  faSolidHeart = faSolidHeart;
  faRegularHeart = faRegularHeart;
  isIconStates : boolean[] = [false, false]; 

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    console.log(this.review);
    console.log(this.media);
  }

  goToDetails(id: number) {
    this.router.navigate(['/details', id])
  }
  
  getNoteColor(note: number): string {
    if (note >= 80) return '#4caf50';
    if (note >= 50) return '#ffc107'; 
    return '#f44336'; 
  }

  toggleIcon(index : number) : void {
    this.isIconStates[index] = !this.isIconStates[index]
  }

  transformType(type: string) : string {
    switch (type) {
      case 'JEU_VIDEO' : 
        return 'Jeu video';
      case 'FILM' : 
        return 'Film';
      case 'BD' : 
        return 'Bande dessinée';
      default: 
        return type;
    }
  }

  
  

  

  
  
    
  
  
  

}
