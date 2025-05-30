import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InspectionService } from './inspection.service';
import { HiveService } from '../hive/hive.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inspection } from './inspection.model';
import { Hive } from '../hive/hive.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  imports: [ NgIf, NgFor, ReactiveFormsModule ],
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
})
export class InspectionFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  inspectionId?: string;
  hives: Hive[] = [];

  constructor(
    private fb: FormBuilder,
    private inspectionService: InspectionService,
    private hiveService: HiveService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      hiveId: ['', Validators.required],
      date: ['', Validators.required],
      notes: [''],
      actions: [''],
    });

    this.hiveService.getAll().subscribe((hives) => (this.hives = hives));

    this.inspectionId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEdit = !!this.inspectionId;

    if (this.isEdit && this.inspectionId) {
      this.inspectionService.getById(this.inspectionId).subscribe({
        next: (inspection: Inspection) => {
          // Patch form values; convert date string to yyyy-MM-dd for input[type=date]
          const dateString = inspection.date.split('T')[0];
          this.form.patchValue({ ...inspection, date: dateString });
        },
        error: () => {
          alert('Inspection not found');
          this.router.navigate(['/inspections']);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    // Prepare the data; convert date back to ISO string if needed
    const formValue = this.form.value;
    const inspection: Inspection = {
      ...formValue,
      date: new Date(formValue.date).toISOString(),
    };

    const request$ = this.isEdit && this.inspectionId
      ? this.inspectionService.update(this.inspectionId, inspection)
      : this.inspectionService.create(inspection);

    request$.subscribe({
      next: () => this.router.navigate(['/inspections']),
      error: (err) => alert('Error: ' + err.message),
    });
  }
}
