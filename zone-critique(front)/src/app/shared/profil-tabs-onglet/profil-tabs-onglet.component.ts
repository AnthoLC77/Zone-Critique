import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../models/media.model';
import { MediaServiceService } from '../../services/media-service.service';

@Component({
  selector: 'app-profil-tabs-onglet',
  imports: [CommonModule],
  templateUrl: './profil-tabs-onglet.component.html',
  styleUrl: './profil-tabs-onglet.component.css'
})
export class ProfilTabsOngletComponent implements OnInit {
  @Input() mediaList: Media[] = [];
  @Input() userWatched!: number; 
  @Input() totalInSaga!: number; 
  activeTab : number = 0;

  tabs = [
      { title: 'BD', content: 'Contenu de l\'onglet 1' },
      { title: 'FILM', content: 'Contenu de l\'onglet 2' },
      { title: 'JEU_VIDEO', content: 'Contenu de l\'onglet 3' }
    ];

  constructor(private mediaService : MediaServiceService) {}

  ngOnInit(): void {
    
  }

  selectTab(index: number) {
    this.activeTab = index;
  }

  get progressPercentage(): number {
    return this.totalInSaga > 0 ? (this.userWatched / this.totalInSaga) * 100 : 0;
  }
}
