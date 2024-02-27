import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SimplePdsUsersService, User } from '../../services/simple-pds-users.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-simple-pds',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './simple-pds.component.html',
  styleUrl: './simple-pds.component.scss',
})
export class SimplePdsComponent {
  #simplePdsUsersService = inject(SimplePdsUsersService);

  #users = new BehaviorSubject<User[]>([]);
  users$ = this.#users.asObservable();

  fetch() {
    this.#simplePdsUsersService.getUsersWhoseNameStartsWithC().then((users: User[]) => {
      this.#users.next(users);
    });
  }
}
