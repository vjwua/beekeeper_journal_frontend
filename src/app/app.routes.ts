import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apiaries', loadChildren: () => import('./apiary/apiary.module').then(m => m.ApiaryModule) },
  { path: 'hives', loadChildren: () => import('./hive/hive.module').then(m => m.HiveModule) },
  { path: 'inspections', loadChildren: () => import('./inspection/inspection.module').then(m => m.InspectionModule) },
  { path: '**', redirectTo: '' },
];
export class AppRoutingModule {}