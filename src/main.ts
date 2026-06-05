// Importa la funcion bootstrapApplication
// Esta funcion sirve para iniciar la aplicacion angular
import { bootstrapApplication } from '@angular/platform-browser';

// Importa las configuraciones generales de la app
// Aqui Angular guarda configuraciones importantes
// como rutas, servicios y opciones globales
import { appConfig } from './app/app.config';

// Importa el componente principal de la aplicación
// AppComponent es la primera pantalla que Angular mostrará
import { App } from './app/app';

// Inicia la aplicación Angular 
// Le dice:
// "Arranca usando AppComponent (App) y las configuraciones appConfig"
bootstrapApplication(App, appConfig)

// Si ocurre algún error al iniciar, 
// lo muestra en la consola del navegador
.catch((err) => console.error(err));

// arrancar Angular, cargar el componente principal, aplicar configuraciones