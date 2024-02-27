import { Component, inject } from '@angular/core';
import { PdsCqsTodoService } from '../../services/pds-cqs-todo.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-pds-cqs',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './pds-cqs.component.html',
  styleUrl: './pds-cqs.component.scss',
})
export class PdsCqsComponent {
  #service = inject(PdsCqsTodoService);

  inputTodo = new FormControl('');
  state = this.#service.state;

  addTodo() {
    this.#service.addTodo(this.inputTodo.value);
    this.inputTodo.reset();
  }

  setTodoCompleted(id: number) {
    this.#service.setTodoCompleted(id);
  }
}
