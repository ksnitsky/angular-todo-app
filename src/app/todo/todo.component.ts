import { StateService } from './../services/state.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Input('project') project: any

  constructor(public state: StateService) { }
}
