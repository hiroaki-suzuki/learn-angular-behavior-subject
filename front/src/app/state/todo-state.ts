import { ObservableState, ReadonlyState } from './observable-state';
import { BehaviorSubject, Observable } from 'rxjs';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
  uncompletedTodos: Todo[];
  completedTodos: Todo[];
};

export class TodoListState implements ObservableState<TodoState> {
  #todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.#todos.asObservable();

  uncompletedTodos$ = new Observable<Todo[]>((observer) => {
    this.#todos.asObservable().subscribe((todos) => {
      const uncompletedTodos = todos.filter((todo) => !todo.completed);
      observer.next(uncompletedTodos);
    });
  });

  completedTodos$ = new Observable<Todo[]>((observer) => {
    this.#todos.asObservable().subscribe((todos) => {
      const completedTodos = todos.filter((todo) => todo.completed);
      observer.next(completedTodos);
    });
  });

  addTodo(title: string | null) {
    const todoTitle = title?.trim();
    if (!todoTitle) {
      return;
    }

    const newTodos = [
      { id: this.#todos.value.length + 1, title: todoTitle, completed: false },
      ...this.#todos.value,
    ];

    this.#todos.next(newTodos);
  }

  setTodoCompleted(id: number) {
    const newTodos = this.#todos.value.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    this.#todos.next(newTodos);
  }

  asReadonly(): ReadonlyState<TodoState> {
    return {
      todos: this.todos$,
      uncompletedTodos: this.uncompletedTodos$,
      completedTodos: this.completedTodos$,
    };
  }
}
