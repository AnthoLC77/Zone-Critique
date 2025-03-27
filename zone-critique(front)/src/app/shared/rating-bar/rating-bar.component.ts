import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/reviews/review.service';
import { AuthService } from '../../services/Auth/auth.service';
import { ModaleService } from '../../services/modaleAuth/modale.service';
@Component({
  selector: 'app-rating-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-bar.component.html',
  styleUrl: './rating-bar.component.css'
})
export class RatingBarComponent implements OnInit {
  @Input() mediaId!: number;
  @Input() userId!: number;
  @Output() openLoginModalEvent = new EventEmitter<void>();

  stars: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  rating: number = 0;
  hasRated: boolean = false;
  hoveredRating!: number ;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private modalService: ModaleService
  ) {}

  ngOnInit() {
    this.loadUserReview();
    console.log("mediaId reçu :", this.mediaId);
    console.log("userId reçu :", this.userId);

  if (this.mediaId === undefined || this.userId === undefined) {
    console.error("Erreur : mediaId ou userId est undefined !");
    return;
  }

  if (!this.mediaId || !this.userId) {
    console.warn("mediaId ou userId est vide, la rating bar ne pourra pas fonctionner correctement.");
    return;
  }
  }

  loadUserReview() {
    if (this.userId) {
      this.reviewService.getUserReviews(this.userId).subscribe(reviews => {
        const userReview = reviews.find((r: any) => r.media.id === this.mediaId);
        if (userReview) {
          this.rating = userReview.rating;  // Récupère la note de l'utilisateur
          console.log(this.rating);
          
          this.hasRated = true;  // L'utilisateur a déjà noté ce média
        }
      });
    }
  }

  rate(rating: number) {
    if(this.hasRated) {
      this.reviewService.updateReview(this.userId, this.mediaId, rating).subscribe(() => {
        this.rating = rating
      })
    } else {
      console.log(this.userId);
      console.log(this.mediaId);
      console.log(rating);
      
      
      
      this.reviewService.addReview(this.userId, this.mediaId, rating).subscribe(() => {
        this.rating = rating;
        this.hasRated = true;
      })
    }
  }



  // ANIMATION 
  hoverRating(value: number): void {
    this.hoveredRating = value; // Définit la note temporaire au survol
  }

  setRating(value: number): void {
    if (!this.authService.getUserData()) {
      this.modalService.openLoginModal();
      return;
    }
    this.rating = value; // Met à jour la note locale
    this.hoveredRating = 0; // Réinitialise l'effet de survol
    this.rate(value); // Envoie la note au backend
  }
}
