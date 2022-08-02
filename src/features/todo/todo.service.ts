import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  // 這個會被實體化, 因此可以保有狀態
  private todos: { id: number; title: string; description: string }[] = [
    {
      id: 1,
      title: 'Title 1',
      description: '',
    },
  ];

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((todo) => todo.id.toString() === id);
  }

  createTodos(item: { id: number; title: string; description: string }) {
    this.todos.push(item);
  }
}
