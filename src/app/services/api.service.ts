import { Project } from '../models/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`)
  }

  postTodo(params: object): Observable<Project[]> {
    return this.http.post<Project[]>(`${environment.apiUrl}/todos`, params)
  }

  patchTodo(projectId: number, todoId: number): Observable<void> {
    return this.http.patch<void>(
      `${environment.apiUrl}/projects/${projectId}/todos/${todoId}`,
      null
    )
  }
}
