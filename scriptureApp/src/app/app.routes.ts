import { Routes } from '@angular/router';
import { ScriptureListComponent } from './scriptures-list/scriptures-list.component';
import { AddScriptureComponent } from './add-scripture/add-scripture.component';
import { EditScriptureComponent } from './edit-scripture/edit-scripture.component';

export const routes: Routes = [
    { path: '', component: ScriptureListComponent, title: 'Scriptures List'}, 
    { path: 'new', component: AddScriptureComponent },
    { path: 'edit/:id', component: EditScriptureComponent }
];
