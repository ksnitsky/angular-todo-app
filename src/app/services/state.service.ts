import { Todo } from './../models/todo';
import { map, Observable } from 'rxjs';
import { ApiService } from './services';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  // data!: Observable<Project[]>
  data!: Project[]

  constructor(private apiService: ApiService) { this.fetchApi() }

  fetchApi(): void {
    this.apiService
      .getTodos()
      .pipe(
        map(res => {
          return plainToInstance(Project, res as Object[])
        })
      )
      .subscribe(res => { this.data = res })
  }

  addTodo(newTodo: object): void {
    this.apiService
      .postTodo({ todo: { ...newTodo } })
      .subscribe({
        next: (res) => {
          console.log(res);
          const newTodo = plainToInstance(Project, res as Object)
          console.log(newTodo);
          
          this.data
            .find(({ id }) => id === newTodo.id)?.todos
            .push(...newTodo.todos) ?? this.data.push(newTodo)
        },
        error: (err) => { console.error(err.message) }
      })
  }

  changeTodoStatus(todo: Todo, projectId: number): void {
    this.apiService
      .patchTodo(projectId, todo.id)
      .subscribe({
        next: () => { todo.toggleStatus() },
        error: (err) => { console.error(err.message) }
      })
  }
}
