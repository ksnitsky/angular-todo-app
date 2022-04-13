import { Type } from 'class-transformer';
import { Todo } from './todo';

export class Project {
  readonly id!: number

  readonly title!: string

  @Type(() => Todo)
  todos!: Todo[]
}
