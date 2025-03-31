import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../services/reviews/review.service';

@Component({
  selector: 'app-stat-profil',
  imports: [CommonModule],
  templateUrl: './stat-profil.component.html',
  styleUrl: './stat-profil.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatProfilComponent implements OnInit {
  @Input() userId !: number
  totalWorks: number = 0;
  stats: any[] = [];

  constructor(
    private reviewsService: ReviewService
  ) {}
  
  ngOnInit() {
    this.fetchStats();
  }

  fetchStats() {
    this.reviewsService.getUserStats(this.userId).subscribe({
      next : (data) => {
        
        this.stats = [
          { label: 'Total', value: data.Total, color: '#FFBD3F' },
          { label: 'films', value: data.films, color: '#FF5733' },
          { label: 'JeuxVideos', value: data.jeuxVideos, color: '#33FF57' },
          { label: 'Bandes Dessinées', value: data.bd, color: '#3357FF' }
        ];

        this.totalWorks = this.stats[0].value
        this.normalizeStats();
      }
    })
  }

  normalizeStats() {
    this.stats = this.stats.map(stat => ({
      ...stat,
      normalizedValue: (stat.value / this.totalWorks) * 100
    })).sort((a, b) => b.value - a.value)
  }
}
