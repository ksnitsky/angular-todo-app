import { Project } from './models/project';
import { StateService } from './services/services';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTodoComponent } from './new-todo/new-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private dialog: MatDialog,
    public state: StateService
  ) { }

  openDialog(): void {
    this.dialog.open(NewTodoComponent, { width: '375px' })
  }

  trackByFn(_index: number, item: Project): number {
    return item.id
  }
}
