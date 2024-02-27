import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, firstValueFrom, mergeMap, toArray } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class SimplePdsUsersService {
  #http = inject(HttpClient);

  async getUsersWhoseNameStartsWithC(): Promise<User[]> {
    return firstValueFrom(
      this.#http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
        mergeMap((users) => users),
        filter((user) => {
          return user.name.startsWith('C');
        }),
        toArray(),
      ),
    );
  }
}
