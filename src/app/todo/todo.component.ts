import { Project } from '../models/project';
import { StateService } from './../services/services';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Input('project')
  project!: Project

  constructor(public state: StateService) { }
}
