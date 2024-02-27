import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-stateful',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, AsyncPipe],
  templateUrl: './stateful.component.html',
  styleUrl: './stateful.component.scss',
})
export class StatefulComponent {
  #count = new BehaviorSubject<number>(0);
  count$ = this.#count.asObservable();

  increment() {
    this.#count.next(this.#count.value + 1);
  }

  decrement() {
    this.#count.next(this.#count.value - 1);
  }
}
