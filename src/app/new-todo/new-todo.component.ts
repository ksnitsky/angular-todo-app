import { StateService } from './../services/state.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent {

  constructor(
    public dialogRef: MatDialogRef<NewTodoComponent>,
    private state: StateService,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: string[] }
  ) { this.initForm() }

  newTodoForm!: FormGroup
  filteredCategories!: Observable<string>[]

  initForm(): void {
    this.newTodoForm = this.fb.group({
      todo_text: ['', Validators.required],
      project_title: ['', Validators.required]
    })
  }

  sendData(): void {
    if (this.newTodoForm.valid) {
      this.state.addTodo(this.newTodoForm.value)
      this.dialogRef.close(
        this.snackBar.displayMessage('Задача успешно создана.')
      )
    }
  }
}
