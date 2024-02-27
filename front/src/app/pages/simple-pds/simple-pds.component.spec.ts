import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SimplePdsComponent } from './simple-pds.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../../services/simple-pds-users.service';
import { of } from 'rxjs';

describe('SimplePdsコンポーネント', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let component: SimplePdsComponent;
  let fixture: ComponentFixture<SimplePdsComponent>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      imports: [SimplePdsComponent, HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SimplePdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('コンポーネントが生成できること', () => {
    expect(component).toBeTruthy();
  });

  it('初期描画時はユーザー情報がないこと', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.current-user').length).toEqual(0);
  });

  it('取得ボタンをクリックするとユーザー情報が取得できること', fakeAsync(() => {
    const responseUsers: User[] = [
      { id: 1, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
      { id: 2, name: 'Leanne Craham', username: 'Bret', email: 'Sincere@april.biz' },
      { id: 3, name: 'Clementina DuBuque', username: 'Moriah', email: 'Padberg@karina.biz' },
    ];
    httpClientSpy.get.and.returnValue(of(responseUsers));

    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('button');
    button.click();
    tick(100);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('.current-user').length).toEqual(2);
  }));
});
