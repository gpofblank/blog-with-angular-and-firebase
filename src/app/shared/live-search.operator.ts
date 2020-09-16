import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

export function liveSearch<T, R>(
  dataCb: (userId) => Promise<R> | Observable<R>,
  delay = 250
) {
  return (source$: Observable<T>) => source$.pipe(
    debounceTime(delay),
    distinctUntilChanged(),
    switchMap(dataCb)
  );
}
