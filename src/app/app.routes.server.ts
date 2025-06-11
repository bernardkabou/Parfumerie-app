// Importation du module nécessaire
import { RenderMode, ServerRoute } from '@angular/ssr';

// Définition des routes du serveur
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
