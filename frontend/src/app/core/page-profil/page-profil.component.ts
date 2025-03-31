import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { StatProfilComponent } from '../../shared/stat-profil/stat-profil.component';
import { SliderComponent } from '../../shared/slider/slider.component';
import { ProfilTabsOngletComponent } from '../../shared/profil-tabs-onglet/profil-tabs-onglet.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { ReviewService } from '../../services/reviews/review.service';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-page-profil',
  imports: [HeaderComponent, CommonModule, StatProfilComponent, SliderComponent, ProfilTabsOngletComponent],
  templateUrl: './page-profil.component.html',
  styleUrl: './page-profil.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageProfilComponent implements OnInit {
  userId!: number;
  userData : any;
  mediaList: Media[] = [];
  reviews: any[] = [];
  totalMedia: number = 0;

  constructor(
    private route : ActivatedRoute,
    private authService : AuthService,
    private reviewsService: ReviewService
  ) {

  }

  ngOnInit() {
    this.userData = this.authService.getUserData();
    if(!this.userData) {
      console.log('Utilisateur non connecté!');
      return;
    }


    this.userId = this.userData.id
    this.fetchStat();
    this.getUserRating();
    this.getUserReviews();
    
    if (this.userId && this.userId !== this.userData.id) {
      console.log('Accès refusé : cet utilisateur ne correspond pas');
      
    } else {
      // console.log('Utilisateur trouvé : ', this.userData);
      
    }
  }

  fetchStat() {
    this.reviewsService.getUserStats(this.userId).subscribe({
      next:(data) => {
        console.log(data);
        
        this.totalMedia = data.Total;
      }
    })
  }

  getUserRating() {
    this.reviewsService.getUserRating(this.userId).subscribe({
      next:(data) => {
        this.reviews = data;

        console.log(this.reviews);
      }
    })
  }

  getUserReviews() {
    this.reviewsService.getUserReviews(this.userId).subscribe({
      next: (reviews) => {
        this.mediaList = reviews.map((reviews:any) => reviews.media);
        // console.log(this.mediaList);
        
        
      },
      error: (err) => {
        console.error('Erreur lors de la recupération des reviews : ', err);
        
      }
    })
  }
}
