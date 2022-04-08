import { SnackBarService } from './services/snack-bar.service';
import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTodoComponent } from './new-todo/new-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
  ) { }

  data: Array<any> = []

  getData(): void {
    this.api.getTodos().subscribe({
      next: (res) => {
        this.data = res
      },
      error: () => {
        this.snackBar.displayMessage('Список задач не был получен.')
      }
    })
  }

  openDialog(): void {
    let categories: string[] = [];
    this.data.forEach(element => categories.push(element.title))
    const dialogRef = this.dialog.open(NewTodoComponent, {
      width: '375px',
      data: {
        categories: categories,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.displayMessage(result.message)
        this.getData()
      }
    })
  }

  ngOnInit(): void {
    this.getData()
  }
}
