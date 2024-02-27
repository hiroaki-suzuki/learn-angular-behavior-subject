import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatefulComponent } from './stateful.component';

describe('ステートフルコンポーネントページ', () => {
  let component: StatefulComponent;
  let fixture: ComponentFixture<StatefulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatefulComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatefulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('コンポーネントが生成できること', () => {
    expect(component).toBeTruthy();
  });

  it('count が初めは 0 で表示されていること', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.current-count').textContent).toEqual('現在のカウント：0');
  });

  it('+1 ボタンをクリックするとカウントが 1 になること', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.button-group button:nth-child(1)');
    button.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.current-count').textContent).toEqual('現在のカウント：1');
  });

  it('+1 ボタンを2回クリックするとカウントが 2 になること', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.button-group button:nth-child(1)');
    button.click();
    button.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.current-count').textContent).toEqual('現在のカウント：2');
  });

  it('-1 ボタンをクリックするとカウントが -1 になること', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.button-group button:nth-child(2)');
    button.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.current-count').textContent).toEqual('現在のカウント：-1');
  });

  it('-1 ボタンを2回クリックするとカウントが -2 になること', () => {
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.button-group button:nth-child(2)');
    button.click();
    button.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.current-count').textContent).toEqual('現在のカウント：-2');
  });
});
