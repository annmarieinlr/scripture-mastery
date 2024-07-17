import { Component, OnInit, WritableSignal } from '@angular/core';
import { ScriptureFormComponent } from '../scripture-form/scripture-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Scripture } from '../scripture';
import { ScriptureService } from '../scripture.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-scripture',
  standalone: true,
  imports: [ScriptureFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit a Scripture</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-scripture-form
          [initialState]="scripture()"
          (formSubmitted)="editScripture($event)"
        ></app-scripture-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditScriptureComponent implements OnInit {
  scripture = {} as WritableSignal<Scripture>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scriptureService: ScriptureService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.scriptureService.getScripture(id!);
    this.scripture = this.scriptureService.scripture$;
  }

  editScripture(scripture: Scripture) {
    this.scriptureService
      .updateScripture(this.scripture()._id || '', scripture)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update employee');
          console.error(error);
        },
      });
  }
}