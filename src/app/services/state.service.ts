import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  data: Array<any> = []

  constructor(private api: ApiService) { this.fetchApi() }

  fetchApi(): void {
    this.api.getTodos()
      .subscribe({
        next: (res) => {
          this.data = res
        },
        error: () => {
          console.error('Список задач не был получен.')
        }
      })
  }

  addTodo(newTodo: any): void {
    this.api.postTodo({ todo: { ...newTodo } })
      .subscribe({
        next: (res) => {
          this.data.find(({ id }) => id === res.id)?.todos
            .push(...res.todos) ?? this.data.push(res)
        },
        error: (err) => {
          console.error(err.message)
        }
      })
  }

  changeTodoStatus(todo: any, projectId: number): void {
    this.api.patchTodo(projectId, todo.id)
      .subscribe({
        next: () => {
          todo.isCompleted = !todo.isCompleted
        },
        error: (err) => {
          console.error(err.message)
        }
      })
  }
}
