import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  imports: [CommonModule, FormsModule, FontAwesomeModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  icons = {
    faCircleXmark : faCircleXmark,
    faEyeSlash : faEyeSlash,
    faEye : faEye
  }
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  errorMessage: string = "";
  formSubmitted = false;
  error: boolean = false;
  isPasswordVisible: boolean = false;

  @Input() currentView : string = '';
  @Input() isModalOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private userService : UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]]
    });

    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password:  ["", Validators.required]
    })
  }

  onSubmit(event : Event) {
    event.preventDefault();
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      this.formSubmitted = false
      console.log("Formulaire valide", this.registerForm.value);

      const newUser: User = {
        username: this.registerForm.value.username,
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.userService.register(newUser).subscribe({
        next:(response) => {
          console.log("Utilisateur enregistré avec succes !", response);
          this.registerForm.reset();
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription", error);
        }
      })
      this.closeModal();
      this.close.emit();
    } else {
      console.log('Formulaire invalide');
    }
  }

  onLogin(event: Event ) {
    event.preventDefault();
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      console.log("Connexion réussie avec les identifiants suivants : ", this.loginForm.value );
      
      this.userService.login(this.loginForm.value).subscribe({
        next:(response) => {

          this.authService.login({
            token: response.token,
            type: response.type,
            id: response.id,
            username: response.username,
            name: response.name,
            email: response.email,
            password: response.password,
            role: response.role
          });

          this.closeModal();
          this.router.navigate(["/profil", response.id])
        },
        error: (error) => {
          console.error("Echec de la connexion",  error);
          this.error = true;
          if (error.status === 401) {
            this.errorMessage = error.error.message ||"Nom d'utilisateur ou mot de passe incorrect."
          } else {
            this.errorMessage = "Un problème est survenue, veuillez réessayer plus tard."
          }
        }
      })
    }
  }

  getErrorMessage(controlName: string) : string {
    const control = this.registerForm.get(controlName);

    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      switch(controlName) {
        case 'password' : 
          return 'Le mot de passe est requis.';
        case 'username' : 
          return "L'username est requis.";
        case 'email' : 
          return "L'email est requis";
        default:
          return `Le champs ${controlName} est requis`;
      }
    }
    if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} caractères.`
    if (control.errors['maxLength']) return `Maximum ${control.errors['maxlength'].requiredLength} caractères.`
    if  (control.errors['email']) return "Adresse email invalide";
    return '';
  }

  signup() {
    this.close.emit();
  }

  closeModal() {
    this.registerForm.reset();
    this.loginForm.reset();
    this.errorMessage= "";
    this.formSubmitted = false;
    this.isPasswordVisible = false;
    this.close.emit();
  }

  switchModal(view: string) {
  this.currentView = view;
  }

  togglePasswordVisibility(event : Event) {
    event.stopPropagation();
    this.isPasswordVisible = !this.isPasswordVisible;

  }

  onBackgroundClick(event : MouseEvent) {
    const modal = event.target as HTMLElement;
    if(modal.classList.contains('bg-opacity-50')) {
      this.closeModal();
    }
  }

}
