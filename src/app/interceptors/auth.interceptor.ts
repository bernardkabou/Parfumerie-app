// Importation du module HttpInterceptorFn
import { HttpInterceptorFn } from '@angular/common/http';

// Définition de l'intercepteur pour ajouter le token d'authentification aux requêtes HTTP
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
// Ajout ou non du token dans les en-têtes de la requête  
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }
  
  return next(req);
};
