import { StateService } from './../services/state.service';
import { SnackBarService } from '../services/snack-bar.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  private categories!: Array<string>
  filteredCategories!: Observable<string[]>
  newTodoForm!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<NewTodoComponent>,
    private state: StateService,
    private fb: FormBuilder,
    private _snackBar: SnackBarService
  ) { this.initForm() }

  sendData(): void {
    if (this.newTodoForm.valid) {
      this.state.addTodo(this.newTodoForm.value)
      this.dialogRef.close(
        this._snackBar.displayMessage('Задача успешно создана.')
      )
    }
  }

  ngOnInit(): void {
    this.filteredCategories = this.newTodoForm.controls['project_title']
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      )

    this.categories = this.state.data.map(({ title }) => title)
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
      this.categories.filter(
        category => category.toLowerCase().includes(filterValue)
      )
    )
  }
}
