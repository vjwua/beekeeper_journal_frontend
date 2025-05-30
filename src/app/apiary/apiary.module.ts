import { NgModule } from '@angular/core';
import { ApiaryComponent } from './apiary.component';
import { ApiaryFormComponent } from './apiary-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    ApiaryComponent, 
    ApiaryFormComponent,
    RouterModule.forChild([
      { path: '', component: ApiaryComponent },
      { path: 'new', component: ApiaryFormComponent },
      { path: ':id/edit', component: ApiaryFormComponent },
    ]),
  ],
})
export class ApiaryModule { }
