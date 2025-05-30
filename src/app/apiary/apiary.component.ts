import { Component, OnInit } from '@angular/core';
import { ApiaryService } from './apiary.service';
import { Apiary } from './apiary.model';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  imports: [ NgIf, NgFor ],
  selector: 'app-apiary',
  templateUrl: './apiary.component.html'
})
export class ApiaryComponent implements OnInit {
  apiaries: Apiary[] = [];
  loading = true;

  constructor(
    private apiaryService: ApiaryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadApiaries();
  }

  loadApiaries(): void {
    this.loading = true;
    this.apiaryService.getAll().subscribe({
      next: (data) => {
        this.apiaries = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load apiaries', err);
        this.loading = false;
      }
    });
  }

  deleteApiary(id: string): void {
    if (confirm('Are you sure you want to delete this apiary?')) {
      this.apiaryService.delete(id).subscribe(() => {
        this.apiaries = this.apiaries.filter(a => a.id !== id);
      });
    }
  }

  goToCreate(): void {
    this.router.navigate(['/apiaries/create']);
  }

  goToEdit(id: string): void {
    this.router.navigate(['/apiaries/edit', id]);
  }
}
