import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Media } from '../../models/media.model';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SwiperContainer } from 'swiper/element';
import { Swiper } from 'swiper/types';
import { MediaServiceService } from '../../services/media-service.service';
import { ProfilCardComponent } from '../profil-card/profil-card.component';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';
import { max } from 'rxjs';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-slider',
  imports: [CommonModule, FontAwesomeModule, CardComponent, ProfilCardComponent, DropDownMenuComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent implements AfterViewInit, OnInit  {
  @Input() categorie: string = '';
  @Input() mediaList : Media[] = [];
  @Input() reviews : Review[] = [];
  @Input() cardType: 'default' | 'customProfil' = 'default';
  @Input() typeDeMedia !: string;
  @ViewChild('swiper') swiperRef!: ElementRef<SwiperContainer>;

  maxSlides : number = 10;
  slidesPerView = 5;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  currentIndex : number = 0;
  mediaDuMoment : Media[] = [];
  mediaProchainement: Media[] = [];
  private swiperInstance: Swiper | null = null;
  
  constructor(
    private mediaService: MediaServiceService
  ) {

  }
  ngOnInit(): void {
    if (this.typeDeMedia) {
      this.loadMediasByType(this.typeDeMedia, this.categorie)
    }

    console.log(this.reviews);
    
  }

  loadMediasByType(type: string, categorie: string) : void {
    if(categorie.includes('du moment')) {
      this.mediaService.getMediaDuMoment(type).subscribe((data) => {
        this.mediaList = data.slice(0, this.maxSlides)
      })
    } else if (categorie.includes('prochaines sorties')) {
      this.mediaService.getMediaProchainement(type).subscribe((data) => {
        this.mediaList = data.slice(0, this.maxSlides)
      })
    } else if (categorie.includes('Incontournables')) {
      this.mediaService.getMediaIncontournable(type).subscribe((data) => {
        this.mediaList = data.slice(0, this.maxSlides)
      })
    }
  }

  findReviewForMedia(mediaId : number): Review | undefined {
    const review =  this.reviews.find((review) => review.media.id === mediaId);
    return review;
  }


    ngAfterViewInit(): void {
      setTimeout(() => {
        if (this.swiperRef.nativeElement.swiper) {
          this.swiperInstance = this.swiperRef.nativeElement.swiper;
  
          // Mettre à jour currentIndex à chaque changement de slide
          this.swiperInstance.on('slideChange', () => {
            this.currentIndex = this.swiperInstance!.realIndex;
            console.log('Slide index updated (swiper event):', this.currentIndex);
          });
  
          // Initialisation correcte de l'index au démarrage
          this.currentIndex = this.swiperInstance.realIndex;
        }
      });
    }

    getSlidesPerView(): number {
      return this.slidesPerView;
    }
  
    goToPrevious() {
      if (this.swiperInstance) {
        this.swiperInstance.slidePrev();
        
      }
    }
  
    goToNext() {
      if (this.swiperInstance) {
        this.swiperInstance.slideNext();
        console.log('next');
        
      }
    }
  
    isAtStart() : boolean {
       return this.currentIndex === 0;
    }

    isAtEnd() {
      return this.currentIndex === this.mediaList.length - 1;
    }
}
