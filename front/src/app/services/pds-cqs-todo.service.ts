import { Injectable } from '@angular/core';
import { TodoListState } from '../state/todo-state';

@Injectable({
  providedIn: 'root',
})
export class PdsCqsTodoService {
  #state = new TodoListState();
  state = this.#state.asReadonly();

  addTodo(title: string | null) {
    this.#state.addTodo(title);
  }

  setTodoCompleted(id: number) {
    this.#state.setTodoCompleted(id);
  }
}
