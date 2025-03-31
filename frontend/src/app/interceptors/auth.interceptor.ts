import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/Auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = inject(AuthService).getAuthToken(); 

    // Log pour vérifier si le token est bien récupéré
    console.log('Token récupéré dans l\'intercepteur:', authToken);

    // Si un token est trouvé, on l'ajoute à l'en-tête de la requête
    if (authToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      // Log pour vérifier que la requête clonée a bien l'en-tête
      console.log('Requête clonée avec le token:', cloned);

      return next.handle(cloned);
    }

    // Si aucun token, on passe la requête sans en-tête d'authentification
    console.log('Aucun token trouvé, requête envoyée sans Authorization');
    return next.handle(req);
  }
}
