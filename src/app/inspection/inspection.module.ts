import { NgModule } from '@angular/core';
import { InspectionComponent } from './inspection.component';
import { InspectionFormComponent } from './inspection-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    InspectionComponent, 
    InspectionFormComponent,
    RouterModule.forChild([
      { path: '', component: InspectionComponent },
      { path: 'create', component: InspectionFormComponent },
      { path: ':id/edit', component: InspectionFormComponent },
    ]),
  ],
})
export class InspectionModule { }
