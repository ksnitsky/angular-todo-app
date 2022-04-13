export class Todo {
  readonly id!: number

  readonly text!: string

  isCompleted!: boolean

  toggleStatus(): void {
    this.isCompleted = !this.isCompleted
  }
}
