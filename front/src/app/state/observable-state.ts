import { Observable } from 'rxjs';

export interface ObservableState<T> {
  asReadonly(): ReadonlyState<T>;
}

export type ReadonlyState<T> = T extends object
  ? {
      [K in keyof T]: Observable<T[K]>;
    }
  : Observable<T>;
