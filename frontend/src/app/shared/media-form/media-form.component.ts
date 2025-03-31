import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MediaServiceService } from '../../services/media-service.service';
import { HeaderComponent } from '../../core/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '../../models/media.model';

@Component({
  selector: 'app-media-form',
  imports: [ReactiveFormsModule, HeaderComponent, CommonModule],
  templateUrl: './media-form.component.html',
  styleUrl: './media-form.component.css'
})
export class MediaFormComponent implements OnInit {
  imagePreview: string | null = null;
  mediaForm!: FormGroup;
  mediaId : number | null = null;
  isEditMode : boolean = false;

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaServiceService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.mediaForm = this.fb.group({
      titre: ["", [Validators.required, Validators.minLength(2)]],
      image: ["", [Validators.required]], 
      date: ["", [Validators.required]], 
      resume: ["", [Validators.required, Validators.maxLength(1000)]], 
      type: ["", [Validators.required]] 
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.mediaId = id ? +id : null;
    if (this.mediaId) {
      this.isEditMode = true;
      this.mediaService.getMediaById(this.mediaId).subscribe({
        next: (media : Media | undefined) => {
          this.mediaForm.patchValue({
            titre: media?.titre,
            date: media?.date,
            resume : media?.resume,
            type: media?.type
          })

          this.imagePreview = media?.image ? `http://localhost:8080/api/media/image/${media?.image.replace('/uploads/', '')}` : null;

        },
        error: (err) => console.error('Erreur lors du chargement du média', err)
      })
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.mediaForm.patchValue({
        image: file
      });
    }
  }

  // 
  
  onSubmit() {
    if (this.mediaForm.valid) {
      console.log("Données du formulaire :", this.mediaForm.value);
  
      const formData = new FormData();
  
      // Ajout des champs texte
      formData.append('titre', this.mediaForm.get('titre')?.value);
      formData.append('date', this.mediaForm.get('date')?.value);
      formData.append('resume', this.mediaForm.get('resume')?.value);
      formData.append('type', this.mediaForm.get('type')?.value);
  
      // Ajout de l'image uniquement si elle est présente
      const fileInput = this.mediaForm.get('image')?.value;
    if (fileInput instanceof File) {
      formData.append('file', fileInput);
    } else if (this.isEditMode && this.imagePreview) {
      // Si en mode édition, envoie le chemin de l'image actuelle pour la conserver
      formData.append('image', this.imagePreview.replace('http://localhost:8080/api/media/image/', ''));
    }
      if (this.isEditMode && this.mediaId) {
        this.mediaService.updateMedia(this.mediaId, formData).subscribe({
          next: (value: Media) => {
            console.log("Média modifié avec succès", value);
            this.router.navigate([`/details/${value.id}`]);
          },
          error: (err) => {
            console.error('Erreur lors de la modification du média', err);
          }
        });
      } else {
        this.mediaService.createMedia(formData).subscribe({
          next: (value: Media) => {
            console.log("Média ajouté avec succès !", value);
            this.router.navigate([`/details/${value.id}`]);
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout du média", err);
          }
        });
      }
    }
  }
  
}
