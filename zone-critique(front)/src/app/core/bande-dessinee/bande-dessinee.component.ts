import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SliderComponent } from '../../shared/slider/slider.component';
import { AuthService } from '../../services/Auth/auth.service';
import { User } from '../../models/user.model';
import { ReviewService } from '../../services/reviews/review.service';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-bande-dessinee',
  imports: [HeaderComponent, SliderComponent],
  templateUrl: './bande-dessinee.component.html',
  styleUrl: './bande-dessinee.component.css'
})
export class BandeDessineeComponent implements OnInit {
  userData!: User;
  reviews: Review[] = [];

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService
  ) {
    

  }
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.getUserRating();
  }

  getUserRating() {
    if (!this.userData?.id) return;

    this.reviewService.getUserRating(this.userData.id).subscribe({
      next:(data) => {
        this.reviews = data;
        console.log("Recuperation des reviews utilisateur log", this.reviews);
      },
      error:(err) => {
        console.error("Erreur lors de la recuperer des reviews", err);
        
      }
    })
  }




}
