import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScriptureListComponent } from './scriptures-list/scriptures-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScriptureListComponent, MatToolbarModule],
  template: `
     <mat-toolbar>
      <span>Scripture Mastery App</span>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `main {
      display: flex;
      justify-content: center;
      padding: 2rem 4rem;
    }`
  ],
})
export class AppComponent {
  title = 'scriptureApp';
}
