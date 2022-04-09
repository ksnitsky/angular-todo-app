import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<any>(`${environment.apiUrl}/projects`)
  }

  postTodo(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/todos`, data)
  }

  patchTodo(data: any) {
    return this.http.patch<any>(
      `${environment.apiUrl}/projects/${data.projectId}/todos/${data.todoId}`,
      null
    )
  }
}
