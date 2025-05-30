import { NgModule } from '@angular/core';
import { HiveComponent } from './hive.component';
import { HiveFormComponent } from './hive-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    HiveComponent, 
    HiveFormComponent,
    RouterModule.forChild([
      { path: '', component: HiveComponent },
      { path: 'new', component: HiveFormComponent },
      { path: ':id/edit', component: HiveFormComponent },
    ]),
  ],
})
export class HiveModule { }
