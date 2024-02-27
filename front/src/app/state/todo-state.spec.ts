import { TodoListState } from './todo-state';

describe('TodoState', () => {
  let sut: TodoListState;

  beforeEach(() => {
    // Arrange
    sut = new TodoListState();
  });

  it('Todoを追加できること', () => {
    sut.addTodo('task1');

    sut.todos$.subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0]).toEqual({ id: 1, title: 'task1', completed: false });
    });
  });

  ['', '  ', '　', '　　', ' 　', '　 '].forEach((title) => {
    it(`'${title}'はTodoを追加しないこと`, () => {
      sut.addTodo(title);
      sut.todos$.subscribe((todos) => {
        expect(todos.length).toBe(0);
      });
    });
  });

  it('Todoを完了できること', () => {
    sut.addTodo('task1');
    sut.setTodoCompleted(1);
    sut.todos$.subscribe((todos) => {
      expect(todos[0].completed).toBe(true);
    });
  });

  it('Todoを未完了にできること', () => {
    sut.addTodo('task1');
    sut.setTodoCompleted(1);
    sut.setTodoCompleted(1);
    sut.todos$.subscribe((todos) => {
      expect(todos[0].completed).toBe(false);
    });
  });

  it('未完了Todoのみ取得できること', () => {
    sut.addTodo('task1');
    sut.addTodo('task2');
    sut.setTodoCompleted(1);
    sut.uncompletedTodos$.subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0]).toEqual({ id: 2, title: 'task2', completed: false });
    });
  });

  it('完了Todoのみ取得できること', () => {
    sut.addTodo('task1');
    sut.addTodo('task2');
    sut.setTodoCompleted(1);
    sut.completedTodos$.subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0]).toEqual({ id: 1, title: 'task1', completed: true });
    });
  });
});
