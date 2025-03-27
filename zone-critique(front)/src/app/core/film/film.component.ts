import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SliderComponent } from "../../shared/slider/slider.component";
import { Media } from '../../models/media.model';
import { MediaServiceService } from '../../services/media-service.service';
import { ReviewService } from '../../services/reviews/review.service';
import { AuthService } from '../../services/Auth/auth.service';
import { Review } from '../../models/review.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-film',
  imports: [HeaderComponent, SliderComponent],
  templateUrl: './film.component.html',
  styleUrl: './film.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilmComponent implements OnInit {
  reviews: Review[] = [];
  userData !: User;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

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
