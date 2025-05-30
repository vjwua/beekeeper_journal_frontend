import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HiveService } from './hive.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hive } from './hive.model';
import { ApiaryService } from '../apiary/apiary.service';
import { Apiary } from '../apiary/apiary.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  imports: [ NgIf, NgFor, ReactiveFormsModule ],
  selector: 'app-hive-form',
  templateUrl: './hive-form.component.html'
})
export class HiveFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  hiveId?: string;
  apiaries: Apiary[] = [];

  constructor(
    private fb: FormBuilder,
    private hiveService: HiveService,
    private apiaryService: ApiaryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      apiaryId: ['', Validators.required],
      type: [''],
      status: ['']
    });

    this.apiaryService.getAll().subscribe(apiaries => this.apiaries = apiaries);

    this.hiveId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEdit = !!this.hiveId;

    if (this.isEdit && this.hiveId) {
      this.hiveService.getById(this.hiveId).subscribe({
        next: (hive: Hive) => this.form.patchValue(hive),
        error: () => {
          alert('Hive not found');
          this.router.navigate(['/hives']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const hive: Hive = this.form.value;

    const request$ = this.isEdit && this.hiveId
      ? this.hiveService.update(this.hiveId, hive)
      : this.hiveService.create(hive);

    request$.subscribe({
      next: () => this.router.navigate(['/hives']),
      error: (err) => alert('Error: ' + err.message)
    });
  }
}
