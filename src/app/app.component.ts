import { ApplicationRef, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, first, switchMap, timer } from 'rxjs';

import { HeaderComponent } from './layouts/header/header.component';
import LoaderComponent from '@shared/components/loader/loader.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, LoaderComponent],
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	private readonly appRef = inject(ApplicationRef);

	ngOnInit() {
		timer(800)
			.pipe(
				switchMap(() => this.appRef.isStable),
				filter((stable) => stable),
				first(),
			)
			.subscribe(() => {
				const splash = document.getElementById('splash-screen');
				if (splash) {
					splash.style.opacity = '0';

					setTimeout(() => {
						splash.remove();
					}, 200);
				}
			});
	}
}
