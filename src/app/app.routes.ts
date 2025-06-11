// Importation des modules nécessaires
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Définition des routes de l'application
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/accueil/accueil.component').then(m => m.AccueilComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./user/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'panier',
    loadComponent: () => import('./cart/panier/panier.component').then(m => m.PanierComponent)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./products/catalog/product-catalog.component').then(m => m.ProductCatalogComponent)
  },
  {
    path: 'hommes',
    loadComponent: () => import('./pages/hommes/hommes.component').then(m => m.HommesComponent)
  },
  {
    path: 'femmes',
    loadComponent: () => import('./pages/femmes/femmes.component').then(m => m.FemmesComponent)
  }
];