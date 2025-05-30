import { Component, OnInit } from '@angular/core';
import { Inspection } from './inspection.model';
import { InspectionService } from './inspection.service';
import { Router } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  imports: [ DatePipe, NgIf, NgFor ],
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
})
export class InspectionComponent implements OnInit {
  inspections: Inspection[] = [];
  loading = true;

  constructor(private inspectionService: InspectionService, private router: Router) {}

  ngOnInit(): void {
    this.loadInspections();
  }

  loadInspections(): void {
    this.inspectionService.getAll().subscribe({
      next: (data) => {
        this.inspections = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load inspections', err);
        this.loading = false;
      },
    });
  }

  deleteInspection(id: string): void {
    if (confirm('Are you sure you want to delete this inspection?')) {
      this.inspectionService.delete(id).subscribe(() => {
        this.inspections = this.inspections.filter((i) => i.id !== id);
      });
    }
  }

  goToCreate(): void {
    this.router.navigate(['/inspections/create']);
  }

  goToEdit(id: string): void {
    this.router.navigate(['/inspections/edit', id]);
  }
}
