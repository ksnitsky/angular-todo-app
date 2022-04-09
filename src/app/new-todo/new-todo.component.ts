import { StateService } from './../services/state.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  newTodoForm!: FormGroup
  filteredCategories!: Observable<string[]>

  constructor(
    public dialogRef: MatDialogRef<NewTodoComponent>,
    private state: StateService,
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: string[] }
  ) { this.initForm() }

  sendData(): void {
    if (this.newTodoForm.valid) {
      this.state.addTodo(this.newTodoForm.value)
      this.dialogRef.close(
        this.snackBar.displayMessage('Задача успешно создана.')
      )
    }
  }

  ngOnInit(): void {
    this.filteredCategories = this.newTodoForm.controls['project_title']
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      )
  }

  private initForm(): void {
    this.newTodoForm = this.fb.group({
      todo_text: ['', Validators.required],
      project_title: ['', Validators.required]
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return (
      this.data.categories.filter(
        category => category.toLowerCase().includes(filterValue)
      )
    )
  }
}
