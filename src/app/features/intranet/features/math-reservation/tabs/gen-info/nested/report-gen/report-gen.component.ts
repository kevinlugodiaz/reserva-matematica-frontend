import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ExcelService } from '@shared/services/excel.service';
import { LoaderService } from '@shared/services/loader.service';
import { dummy } from './export.dummy';

interface Report {
	id: number;
	product: string;
	year: number;
	month: string;
	createdAt: Date;
	status: {
		code: string;
		label: string;
		severity: string;
	};
}

@Component({
	selector: 'app-report-gen',
	imports: [Button, TableModule, Message, Tag, Tooltip, DatePipe, TitleCasePipe],
	standalone: true,
	templateUrl: './report-gen.component.html',
	styleUrl: './report-gen.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReportGenComponent {
	private readonly loader = inject(LoaderService);
	private readonly excelService = inject(ExcelService);

	readonly dataSource = signal<Report[]>([]);

	newReport(): void {
		this.dataSource.update((currentValue) => {
			return [
				...currentValue,
				{
					id: currentValue.length + 1,
					product: 'Renta Vitalicia',
					year: 2025,
					month: 'Enero',
					createdAt: new Date(),
					status: {
						code: 'IN_PROGRESS',
						label: 'Carga Iniciada',
						severity: 'secondary',
					},
				},
			];
		});

		setTimeout(() => {
			this.dataSource.update((currentValue) => {
				return currentValue.map((item) => {
					return {
						...item,
						status: {
							code: 'FINISHED',
							label: 'Carga Finalizada',
							severity: 'success',
						},
					};
				});
			});
		}, 4000);
	}

	async export() {
		this.loader.show('Exportando datos...');
		await this.excelService.exportData(dummy);
		this.loader.hide();
	}
}
