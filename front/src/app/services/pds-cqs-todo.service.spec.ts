import { TestBed } from '@angular/core/testing';

import { PdsCqsTodoService } from './pds-cqs-todo.service';

describe('PdsCqsTodoサービス', () => {
  let service: PdsCqsTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdsCqsTodoService);
  });

  it('インスタンスが生成できること', () => {
    expect(service).toBeTruthy();
  });

  it('addTodo が呼び出せること', () => {
    service.addTodo('test');
    service.state.todos.subscribe((todos) => {
      expect(todos.length).toBe(1);
      expect(todos[0].title).toBe('test');
    });
  });

  it('setTodoCompleted が呼び出せること', () => {
    service.addTodo('test');
    service.setTodoCompleted(1);
    service.state.todos.subscribe((todos) => {
      expect(todos[0].completed).toBe(true);
    });
  });
});
