import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SliderComponent } from '../../shared/slider/slider.component';
import { User } from '../../models/user.model';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/reviews/review.service';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-jeu-video',
  imports: [HeaderComponent, SliderComponent],
  templateUrl: './jeu-video.component.html',
  styleUrl: './jeu-video.component.css'
})
export class JeuVideoComponent implements OnInit {
  
  userData !: User;
  reviews : Review[] = [];

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
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
