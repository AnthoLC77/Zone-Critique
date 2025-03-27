import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Review } from '../../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = "http://localhost:8080/api/reviews"

  constructor(private http: HttpClient) {

   }

   addReview(userId: number, mediaId: number, rating: number): Observable<any> {
    const review = {
      user: { id: userId },   // Ajoute l'utilisateur avec son ID
      media: { id: mediaId },  // Ajoute le média avec son ID
      rating: rating           // Ajoute la note
    };
    
    return this.http.post(`${this.apiUrl}/create`, review).pipe(
      catchError(error => {
        console.error('Erreur dans la requête:', error);
        return of({ error: true, message: error.message });
      })
    );
  }

   updateReview(userId: number, mediaId: number, rating: number): Observable<any> {
    const review = {
      user: { id: userId },   // Ajoute l'utilisateur avec son ID
      media: { id: mediaId },  // Ajoute le média avec son ID
      rating: rating           // Ajoute la note
    };

    return this.http.put(this.apiUrl, review).pipe(
      catchError(error => {
        console.error('Erreur dans la requête:', error);
        return of({ error: true, message: error.message });
      })
    );
  }

   getUserReviews(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getUserRating(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`)
  }

  getUserStats(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/stats`)
  }
}
