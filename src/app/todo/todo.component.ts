import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  todos: Array<any> = []
  apiUrl: string = 'http://localhost:3000/projects'


  async getTodos() {
    const res = await fetch(this.apiUrl)
    const data = await res.json()
    this.todos = await data
    // this.todos = Object.entries(this.todos)
  }

  constructor() { }

  ngOnInit(): void {
    this.getTodos()
      .then(() => {
        console.log(this.todos)
      })
  }
}
