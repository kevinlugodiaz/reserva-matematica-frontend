import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';

@Component({
	selector: 'app-loader',
	imports: [],
	templateUrl: './loader.component.html',
	styleUrl: './loader.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoaderComponent implements OnInit {
	private readonly loader = inject(LoaderService);

	readonly message = signal('');

	ngOnInit() {
		this.loader.subject.subscribe((message: string) => {
			this.message.set(message);
		});
	}
}
