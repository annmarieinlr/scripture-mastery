import { Component, OnInit, WritableSignal } from '@angular/core';
import { Scripture } from '../scripture';
import { ScriptureService } from '../scripture.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-scriptures-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;
        

        button:first-of-type {
          margin-right: 1rem;
        }
      }

      
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Scriptures List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="scripture$()">  
          <ng-container matColumnDef="col-reference">
            <th mat-header-cell *matHeaderCellDef>Reference</th>
            <td mat-cell *matCellDef="let element">{{ element.reference }}</td>
          </ng-container>
          <ng-container matColumnDef="col-text">
            <th mat-header-cell *matHeaderCellDef>Text</th>
            <td mat-cell *matCellDef="let element">{{ element.text }}</td>
          </ng-container>
          <ng-container matColumnDef="col-status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">{{ element.status }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteScripture(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Scripture
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ScriptureListComponent implements OnInit {
  scripture$ = {} as WritableSignal<Scripture[]>;
  displayedColumns: string[] = [
    'col-reference',
    'col-text',
    'col-status',
    'col-action',
  ];

  constructor(private scripturesService: ScriptureService) {}

  ngOnInit() {
    this.fetchScriptures();
  }

  deleteScripture(id: string): void {
    this.scripturesService.deleteScripture(id).subscribe({
      next: () => this.fetchScriptures(),
    });
  }

  private fetchScriptures(): void {
    this.scripture$ = this.scripturesService.scriptures$;
    this.scripturesService.getScriptures();
  }
}