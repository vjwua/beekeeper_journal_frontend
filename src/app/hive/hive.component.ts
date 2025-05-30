import { Component, OnInit } from '@angular/core';
import { Hive } from './hive.model';
import { HiveService } from './hive.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
@Component({
  imports: [ NgIf, NgFor ],
  selector: 'app-hive',
  templateUrl: './hive.component.html'
})
export class HiveComponent implements OnInit {
  hives: Hive[] = [];
  loading = true;

  constructor(
    private hiveService: HiveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHives();
  }

  loadHives(): void {
    this.hiveService.getAll().subscribe({
      next: (data) => {
        this.hives = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load hives', err);
        this.loading = false;
      }
    });
  }

  deleteHive(id: string): void {
    if (confirm('Are you sure you want to delete this hive?')) {
      this.hiveService.delete(id).subscribe(() => {
        this.hives = this.hives.filter(h => h.id !== id);
      });
    }
  }

  goToCreate(): void {
    this.router.navigate(['/hives/create']);
  }

  goToEdit(id: string): void {
    this.router.navigate(['/hives/edit', id]);
  }
}
