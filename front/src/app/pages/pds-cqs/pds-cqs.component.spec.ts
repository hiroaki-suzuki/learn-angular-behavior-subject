import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdsCqsComponent } from './pds-cqs.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PdsCqsComponent', () => {
  let component: PdsCqsComponent;
  let fixture: ComponentFixture<PdsCqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdsCqsComponent, HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PdsCqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('コンポーネントが生成できること', () => {
    expect(component).toBeTruthy();
  });

  it('初期描画時は未完了のTodoがないこと', () => {
    const compiled = fixture.nativeElement;
    expect(getUncompletedTodoList(compiled).length).toEqual(0);
  });

  it('初期描画時はTodoがないこと', () => {
    const compiled = fixture.nativeElement;
    expect(getUncompletedTodoList(compiled).length).toEqual(0);
    expect(getCompletedTodoList(compiled).length).toEqual(0);
  });

  it('Todoを1つ追加できること', () => {
    const compiled = fixture.nativeElement;

    addTodo('テストTodo', compiled);

    expect(getUncompletedTodoList(compiled).length).toEqual(1);
  });

  it('Todoを2つ追加できること', () => {
    const compiled = fixture.nativeElement;

    addTodo('テストTodo1', compiled);
    addTodo('テストTodo2', compiled);

    expect(getUncompletedTodoList(compiled).length).toEqual(2);
  });

  it('Todoを追加すると入力欄がクリアされること', () => {
    const compiled = fixture.nativeElement;
    const input = compiled.querySelector('input');

    addTodo('テストTodo', compiled, input);

    expect(input.value).toEqual('');
  });

  it('Todoをチェックすると完了済のTodoに移動すること', () => {
    const compiled = fixture.nativeElement;

    addTodo('テストTodo', compiled);

    const todoElement = getUncompletedTodoList(compiled)[0];
    todoElement.querySelector('mat-checkbox').click();
    fixture.detectChanges();

    expect(getUncompletedTodoList(compiled).length).toEqual(0);
    expect(getCompletedTodoList(compiled).length).toEqual(1);
  });

  it('追加された未完了Todoに入力したTodoのタイトルが表示されていること', () => {
    const compiled = fixture.nativeElement;

    addTodo('テストTodo', compiled);
    const titleElement = compiled.querySelector('.uncompleted-todo-list .todo-item .todo-title');

    expect(titleElement.textContent).toEqual('テストTodo');
  });

  it('移動された完了TodoにTodoのタイトルが表示されていること', () => {
    const compiled = fixture.nativeElement;

    addTodo('テストTodo', compiled);

    const todoElement = getUncompletedTodoList(compiled)[0];
    todoElement.querySelector('mat-checkbox').click();
    fixture.detectChanges();
    const titleElement = compiled.querySelector('.completed-todo-list .todo-item .todo-title');

    expect(titleElement.textContent).toEqual('テストTodo');
  });

  function getUncompletedTodoList(compiled: any): any {
    return compiled.querySelectorAll('.uncompleted-todo-list .todo-item');
  }

  function getCompletedTodoList(compiled: any): any {
    return compiled.querySelectorAll('.completed-todo-list .todo-item');
  }

  function addTodo(title: string, compiled: any, input: any = null): void {
    const inputTodo = input ?? compiled.querySelector('input');
    inputTodo.value = title;
    inputTodo.dispatchEvent(new Event('input'));
    inputTodo.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true }));
    fixture.detectChanges();
  }
});
