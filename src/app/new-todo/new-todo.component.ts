import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewTodoComponent>,
    private api: ApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { categories: string[] }
  ) { }

  newTodoForm!: FormGroup
  newCategory: boolean = false

  initForm(): void {
    this.newTodoForm = this.fb.group({
      todo_text: ['', Validators.required],
      project_title: ['', Validators.required]
    })
  }

  sendData(): void {
    if (this.newTodoForm.valid) {
      this.api.postTodo({ todo: { ...this.newTodoForm.value } })
        .subscribe({
          next: (res) => {
            this.dialogRef.close(res)
          },
          error: (res) => {
            this.dialogRef.close(res)
          }
        })
    }
  }

  ngOnInit(): void {
    this.initForm()
  }
}
