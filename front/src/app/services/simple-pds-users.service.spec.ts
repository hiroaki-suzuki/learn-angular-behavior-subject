import { TestBed } from '@angular/core/testing';

import { SimplePdsUsersService, User } from './simple-pds-users.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('SimplePdsユーザーサービス', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: SimplePdsUsersService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });

    service = TestBed.inject(SimplePdsUsersService);
  });

  it('インスタンスが生成できること', () => {
    expect(service).toBeTruthy();
  });

  it('getUsersWhoseNameStartsWithC() が呼び出せること', (done: DoneFn) => {
    const responseUsers: User[] = [
      { id: 1, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
      { id: 2, name: 'Leanne Craham', username: 'Bret', email: 'Sincere@april.biz' },
      { id: 3, name: 'Clementina DuBuque', username: 'Moriah', email: 'Padberg@karina.biz' },
    ];
    const expectedUsers: User[] = [
      { id: 1, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
      { id: 3, name: 'Clementina DuBuque', username: 'Moriah', email: 'Padberg@karina.biz' },
    ];
    httpClientSpy.get.and.returnValue(of(responseUsers));

    service.getUsersWhoseNameStartsWithC().then((users) => {
      expect(users).toEqual(expectedUsers);
      done();
    });
  });
});
