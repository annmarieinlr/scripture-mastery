import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Scripture } from '../scripture';

@Component({
  selector: 'app-scripture-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .scripture-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="scripture-form"
      autocomplete="off"
      [formGroup]="scriptureForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Reference</mat-label>
        <input matInput placeholder="Reference" formControlName="reference" required />
        @if (reference.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Text</mat-label>
        <input
          matInput
          placeholder="Text"
          formControlName="text"
          required
        />
        @if (text.invalid) {
        <mat-error>Position must be at least 5 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-radio-group formControlName="status" aria-label="Select an option">
        <mat-radio-button name="status" value="new" required 
          >New</mat-radio-button
        >
        <mat-radio-button name="status" value="review"
          >Review</mat-radio-button
        >
      
      </mat-radio-group>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="scriptureForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class ScriptureFormComponent {
  initialState = input<Scripture>();

  @Output()
  formValuesChanged = new EventEmitter<Scripture>();

  @Output()
  formSubmitted = new EventEmitter<Scripture>();

  scriptureForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form within the constructor
    this.scriptureForm = this.formBuilder.group({
      reference: ['', [Validators.required, Validators.minLength(3)]],
      text: ['', [Validators.required, Validators.minLength(5)]],
      status: ['new', [Validators.required]],
    });
  
    // method to react to changes or for initialization
    effect(() => {
      this.scriptureForm.setValue({
        reference: this.initialState()?.reference || '',
        text: this.initialState()?.text || '',
        status: this.initialState()?.status || 'new',
      });
    });
  }
  
  // scriptureForm = this.formBuilder.group({
  //   reference: ['', [Validators.required, Validators.minLength(3)]],
  //   text: ['', [Validators.required, Validators.minLength(5)]],
  //   status: ['new', [Validators.required]],
  // });

  // constructor(private formBuilder: FormBuilder) {
  //   effect(() => {
  //     this.scriptureForm.setValue({
  //       reference: this.initialState()?.reference || '',
  //       text: this.initialState()?.text || '',
  //       status: this.initialState()?.status || 'new',
  //     });
  //   });
  // }

  get reference() {
    return this.scriptureForm.get('reference')!;
  }
  get text() {
    return this.scriptureForm.get('text')!;
  }
  get status() {
    return this.scriptureForm.get('status')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.scriptureForm.value as Scripture);
  }
}