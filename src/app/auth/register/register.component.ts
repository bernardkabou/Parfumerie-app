// Importation des modules nécessaires
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Déclaration du composant et création du formulaire pour l'inscription
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-form">
        <h2>Créer un compte</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Nom complet</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name" 
              [class.is-invalid]="isFieldInvalid('name')"
            >
            <div class="invalid-feedback" *ngIf="getFieldError('name', 'required')">
              Le nom est requis
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              [class.is-invalid]="isFieldInvalid('email')"
            >
            <div class="invalid-feedback" *ngIf="getFieldError('email', 'required')">
              L'email est requis
            </div>
            <div class="invalid-feedback" *ngIf="getFieldError('email', 'email')">
              Format d'email invalide
            </div>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              [class.is-invalid]="isFieldInvalid('password')"
            >
            <div class="invalid-feedback" *ngIf="getFieldError('password', 'required')">
              Le mot de passe est requis
            </div>
            <div class="invalid-feedback" *ngIf="getFieldError('password', 'minlength')">
              Le mot de passe doit contenir au moins 6 caractères
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <input 
              type="password" 
              id="confirmPassword" 
              formControlName="confirmPassword" 
              [class.is-invalid]="isFieldInvalid('confirmPassword')"
            >
            <div class="invalid-feedback" *ngIf="getFieldError('confirmPassword', 'required')">
              La confirmation du mot de passe est requise
            </div>
            <div class="invalid-feedback" *ngIf="getFieldError('confirmPassword', 'passwordMismatch')">
              Les mots de passe ne correspondent pas
            </div>
          </div>

          <button type="submit" [disabled]="!registerForm.valid || isLoading">
            {{ isLoading ? 'Création du compte...' : 'Créer un compte' }}
          </button>

          <div *ngIf="error" class="alert alert-danger mt-3">
            {{ error }}
          </div>
        </form>
        <p class="login-link">
          Déjà membre ? <a routerLink="/login">Se connecter</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/H10.png');
      background-size: cover;
      background-position: center;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .register-form {
      background: white;
      padding: 2.5rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    input:focus {
      border-color: #1a237e;
      outline: none;
      box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
    }

    input.is-invalid {
      border-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    button {
      width: 100%;
      padding: 1rem;
      background-color: #1a237e;
      color: white;
      border: 2px solid #1a237e;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    button:hover:not(:disabled) {
      background-color: #0d47a1;
      border-color: #0d47a1;
      transform: translateY(-1px);
    }

    button:disabled {
      background-color: #ccc;
      border-color: #ccc;
      cursor: not-allowed;
    }

    .alert {
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 4px;
    }

    .alert-danger {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }

    .login-link {
      text-align: center;
      margin-top: 1.5rem;
      color: #666;
    }

    .login-link a {
      color: #1a237e;
      text-decoration: none;
      font-weight: 600;
      margin-left: 0.5rem;
      transition: color 0.3s ease;
    }

    .login-link a:hover {
      color: #0d47a1;
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  //Constructeur du composant
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Méthodes pour vérifier l'état des champs du formulaire
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  getFieldError(fieldName: string, error: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!field && field.errors?.[error] && (field.dirty || field.touched);
  }

  passwordMatchValidator(group: FormGroup): {[key: string]: any} | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword) {
      const errors = { ...confirmPassword.errors };
      delete errors['passwordMismatch'];
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }
    
    return null;
  }

  // Méthode pour gérer la soumission du formulaire d'inscription
  onSubmit(): void {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.error = null;

      const { confirmPassword, ...registrationData } = this.registerForm.value;

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.error?.message || 'Une erreur est survenue lors de l\'inscription.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
