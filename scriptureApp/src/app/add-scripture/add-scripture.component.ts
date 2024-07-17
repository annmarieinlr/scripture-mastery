import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptureFormComponent } from '../scripture-form/scripture-form.component';
import { Scripture } from '../scripture';
import { ScriptureService } from '../scripture.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-scripture',
  standalone: true,
  imports: [ScriptureFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Scripture</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-scripture-form
          (formSubmitted)="addScripture($event)"
        ></app-scripture-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddScriptureComponent {
  constructor(
    private router: Router,
    private scriptureService: ScriptureService
  ) {}

  addScripture(scripture: Scripture) {
    this.scriptureService.createScripture(scripture).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create employee');
        console.error(error);
      },
    });
    this.scriptureService.getScriptures();
  }
}