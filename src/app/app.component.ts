import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTodoComponent } from './new-todo/new-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data: Array<any> = []
  newTodo: object = {
    text: String,
    project_title: String
  }

  constructor(
    public dialog: MatDialog,
  ) { }

  async getData() {
    const res = await fetch(environment.apiUrl)
    const data = await res.json()
    this.data = await data
  }

  openDialog(): void {
    let categories: string[] = [];
    (this.data.forEach(element => categories.push(element.title)))
    const dialogRef = this.dialog.open(NewTodoComponent, {
      data: {
        categories: categories,
        newTodo: this.newTodo
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, ' app.component')
    })
  }

  ngOnInit(): void {
    this.getData()
  }
}
