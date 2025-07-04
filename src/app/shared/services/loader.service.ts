import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	readonly subject = new Subject<string>();

	show(message = 'Cargando...'): void {
		this.subject.next(message);
	}

	hide(): void {
		this.subject.next('');
	}
}
