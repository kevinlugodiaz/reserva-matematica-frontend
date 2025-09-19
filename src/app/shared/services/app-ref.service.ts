import { ApplicationRef, inject, Injectable } from '@angular/core';
import { filter, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppRefService {
  private readonly appRef = inject(ApplicationRef);

  isStable(fuc: () => void): void {
    this.appRef.isStable
      .pipe(
        filter((stable) => stable),
        first(),
      )
      .subscribe(() => fuc());
  }
}
