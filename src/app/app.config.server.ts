// Importation des modules nécessaires
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// Définition de la configuration du serveur
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

// Fusion de la configuration de l'application et de la configuration du serveur
export const config = mergeApplicationConfig(appConfig, serverConfig);