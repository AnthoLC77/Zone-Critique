import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../models/media.model';
import { Router, RouterLink } from '@angular/router';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-profil-card',
  imports: [RouterLink],
  templateUrl: './profil-card.component.html',
  styleUrl: './profil-card.component.css'
})
export class ProfilCardComponent implements OnInit {
  @Input() media!: any;
  @Input() review!: Review | undefined;

  constructor(private router: Router) {}


  ngOnInit(): void {
    console.log("Review reçu : ", this.media);
  }

  goToDetails(id : number) {
    this.router.navigate(['/details', id])
  }
  
 }
