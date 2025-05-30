import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiaryService } from './apiary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apiary } from './apiary.model';
import { NgIf } from '@angular/common';

@Component({
  imports: [ NgIf, ReactiveFormsModule ],
  selector: 'app-apiary-form',
  templateUrl: './apiary-form.component.html'
})
export class ApiaryFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  apiaryId?: string;

  constructor(
    private fb: FormBuilder,
    private apiaryService: ApiaryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      location: [''],
      description: ['']
    });

    this.apiaryId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEdit = !!this.apiaryId;

    if (this.isEdit && this.apiaryId) {
      this.apiaryService.getById(this.apiaryId).subscribe({
        next: (apiary: Apiary) => this.form.patchValue(apiary),
        error: () => {
          alert('Apiary not found');
          this.router.navigate(['/apiaries']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const apiary: Apiary = this.form.value;

    const request$ = this.isEdit && this.apiaryId
      ? this.apiaryService.update(this.apiaryId, apiary)
      : this.apiaryService.create(apiary);

    request$.subscribe({
      next: () => this.router.navigate(['/apiaries']),
      error: (err) => alert('Error: ' + err.message)
    });
  }
}
