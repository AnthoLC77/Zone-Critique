import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Media } from '../models/media.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MediaServiceService {
  private apiUrl = "http://localhost:8081/api/media"
  constructor(
    private http: HttpClient
  ) { }

  getMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(this.apiUrl);
  }

  getMediaById(id: number): Observable<Media | undefined> {
    return this.getMedias().pipe(
      map((medias: Media[]) => {
        const foundMedia = medias.find(media => String(media.id) === String(id)); 
        console.log('Média trouvé :', foundMedia); 
        return foundMedia;
      })
    );
  }

  getMediaByType(type : string) : Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/type/${type}`);
  }

  // Categorie Media du moment 
  getMediaDuMoment(type : string) : Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/du-moment/${type}`)
  }

  // Categorie Prochaine sortie Media
  getMediaProchainement(type: string) : Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/prochainement/${type}`)
  }

  getMediaIncontournable(type: string) : Observable<Media[]> {
    return this.http.get<Media[]>(`${this.apiUrl}/meilleur-note/${type}`)
  }


  searchMedias(query: string) : Observable<Media[]> {
    return this.getMedias().pipe(
      map((medias: Media[]) => 
      medias.filter(media => 
        media.titre.toLowerCase().includes(query.toLowerCase())
      ))
    )
  }

  // API REST

  createMedia(formData: FormData): Observable<Media> {
    
    return this.http.post<Media>(this.apiUrl, formData);
  }

  updateMedia(id: number, formData : FormData) : Observable<Media> {
    return this.http.put<Media>(`${this.apiUrl}/${id}`, formData)
  }

  deleteMedia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {responseType: 'text' as 'json'})
  }
}
