import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private api: ApiService) { }

  @Input('project') project: any

  changeStatus(todo: any, projectId: number) {
    this.api.patchTodo({ todoId: todo.id, projectId })
      .subscribe({
        next: (res) => {
          console.log(todo)
          console.log(res)
          
        },
        error: (res) => {
          console.log(res)
        }
      })
  }

  ngOnInit(): void {
  }
}
