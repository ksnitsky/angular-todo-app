import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent {

  newTodo!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<NewTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: string[] },
    private fb: FormBuilder
  ) {
    this.initForm()
  }

  initForm() {
    this.newTodo = this.fb.group({
      text: [null],
      project_title: [null]
    })
  }

  sendData(): void {
    this.dialogRef.close(this.newTodo.value)
  }
}
