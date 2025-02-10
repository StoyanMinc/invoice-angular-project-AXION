import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component.js';
import { DocumentsComponent } from './documents/documents.component.js';

export const routes: Routes = [
    { path:'', redirectTo:'home', pathMatch:"full" },
    { path:'home', component:HomeComponent },
    {path: 'documents',component:DocumentsComponent }
];
