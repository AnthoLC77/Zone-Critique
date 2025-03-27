import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaServiceService } from '../../services/media-service.service';
import { RatingBarComponent } from '../../shared/rating-bar/rating-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faChevronLeft, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faFlag as faFlagRegular, faHeart as faSolidHeart} from '@fortawesome/free-regular-svg-icons';
import { faFlag as faFlagSolid, faHeart as faRegularHeart, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faReplyAll as faSolidReply } from '@fortawesome/free-solid-svg-icons';
import { ProgressCircleComponent } from '../../shared/progress-circle/progress-circle.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-media-detail-page',
  imports: [CommonModule, HeaderComponent, RatingBarComponent, FontAwesomeModule, ProgressCircleComponent],
  templateUrl: './media-detail-page.component.html',
  styleUrl: './media-detail-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MediaDetailPageComponent implements OnInit {
  media !: any;
  user!: any;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faChevronUp = faChevronUp;
  faFlagSolid = faFlagSolid;
  faFlagRegular = faFlagRegular;
  faHeartRegular = faRegularHeart;
  faHeartSolid = faSolidHeart;
  faSolidReply = faSolidReply;
  faTrash = faTrash;
  faEdit = faEdit;
  isIconStates: boolean[] = [false, false]
  isActiveStates = [false, false];


  constructor(
    private route: ActivatedRoute,
    private mediaService: MediaServiceService,
    private router: Router,
    private authService : AuthService
  ) {
  
  }
  ngOnInit(): void {
    this.user = this.authService.getUserData();

    this.route.paramMap.subscribe((params) => {
      const mediaId = Number(params.get('id'));
      if (!mediaId) {
        console.error("Problème : L'ID est invalide !");
        return;
      }
      this.loadMedia(mediaId);
    });
  }

  loadMedia(id: number): void {
    this.mediaService.getMediaById(id).subscribe((media) => {
      console.log("Valeur de media.image :", media?.image);
      this.media = media;
    });
  }

  onEditClick() {
    this.router.navigate(["/edit", this.media?.id])
  }

  deleteMedia() {
    if (!this.media?.id) {
      console.error("ID du média non défini !");
      return;
    }
  
    if (confirm("Voulez-vous vraiment supprimer ce média ?")) {
      this.mediaService.deleteMedia(this.media.id).subscribe({
        next: () => {
          console.log("Media supprimé avec succès !");
          this.router.navigate(['/']);
        },
        error: err => console.error("Erreur lors de la suppression :", err)
      });
    }
  }

  transformType(type: string | undefined) : string {
    if (!type) {
      return 'Inconnu'
    }
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
  

  toggleIcon(index: number): void {
    this.isIconStates[index] = !this.isIconStates[index];
    this.isActiveStates[index] = !this.isActiveStates[index];
  }
}
