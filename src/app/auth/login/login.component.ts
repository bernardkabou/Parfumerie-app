// Importations des modules nécessaires
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

// Déclaration du composant
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

// Propriété du composant
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };
  
  isLoading = false;
  error: string | null = null;

// Constructeur du composant
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Méthode pour gérer la soumission du formulaire de connexion
  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.isLoading = true;
      this.error = null;
      
      this.authService.login(this.loginData.email, this.loginData.password).subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          this.error = err.error?.message || 'Une erreur est survenue lors de la connexion.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
