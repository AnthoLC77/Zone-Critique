import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginModalComponent } from './shared/login-modal/login-modal.component';
import { MediaDetailPageComponent } from './core/media-detail-page/media-detail-page.component';
import { PageProfilComponent } from './core/page-profil/page-profil.component';
import { FilmComponent } from './core/film/film.component';
import { JeuVideoComponent } from './core/jeu-video/jeu-video.component';
import { BandeDessineeComponent } from './core/bande-dessinee/bande-dessinee.component';
import { MediaFormComponent } from './shared/media-form/media-form.component';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { NouveauteComponent } from './core/nouveaute/nouveaute.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'details/:id', component: MediaDetailPageComponent},
    {path: 'login', component: LoginModalComponent},
    {path: 'profil/:id', component: PageProfilComponent},
    {path: 'update/:id', component: UserFormComponent},
    {path: 'nouveaute', component: NouveauteComponent},
    {path: 'films', component: FilmComponent},
    {path: 'jeuvideo', component: JeuVideoComponent},
    {path: 'bandeDessinee', component: BandeDessineeComponent},
    {path: "ajout", component: MediaFormComponent},
    {path: "edit/:id", component: MediaFormComponent}
];
