import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/Auth/auth.service';
import { HeaderComponent } from '../../core/header/header.component';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserFormComponent implements OnInit {

  profileForm!: FormGroup;
  userData !: any;
  errorMessage: {[Key: string]: string} = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    console.log(this.userData);

    this.profileForm = this.fb.group({
      username: [this.userData.username, Validators.required],
      name:[this.userData.name, Validators.required],
      email: [this.userData.email, [Validators.email, Validators.required]]
    })
    
    console.log(this.errorMessage);
    
  }

  updateUser() {
    if (this.profileForm.invalid) {
      console.error('Aucun utilisateur charger !');
      return;
    }

    const updatedUser = {
      id: this.userData.id,
      username: this.profileForm.value.username,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email
    };
    console.log(updatedUser);
    

    this.userService.updateUser(updatedUser.id, updatedUser).subscribe({
      next:(response) => {
        console.log("Utilisateur mis à jour avec succès !", response);
        alert("Votre profil à été mis à jour !"); 

        localStorage.setItem('user', JSON.stringify(response));
        this.userData = response

        this.profileForm.patchValue({
          username: response.username,
          name: response.name,
          email: response.email
        });

        this.errorMessage = {};
        window.location.reload();
      },
      error:(err) => {

        this.errorMessage = {};
        if (err.status === 400) {
          if(err.error.includes("Nom d'utilisateur déjà utilisé par un autre utilisateur")) {
            this.errorMessage['username'] = "Ce nom d'utilisateur est déjà pris."
          } else if (err.error.includes("Email deja enregistrer par un autre utilisateur")) {
            this.errorMessage['email'] = "Cet email est déjà utilisé par un autre utilisateur."
          }
        } else {
          this.errorMessage['général'] = "Une erreur est survenue, veuillez réessayer plus tard.";
      }
      }
    })
  }


}
