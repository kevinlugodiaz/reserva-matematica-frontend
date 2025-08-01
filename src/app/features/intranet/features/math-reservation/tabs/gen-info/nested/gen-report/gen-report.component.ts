import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ExcelService } from '@shared/services/excel.service';
import { dummy } from './dummy';

@Component({
  selector: 'app-gen-report',
  imports: [Button, Tag],
  templateUrl: './gen-report.component.html',
  styleUrl: './gen-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GenReportComponent {
	private readonly excelService = inject(ExcelService);
	private readonly dummy = dummy;

	exportData(): void {
		this.excelService.exportData(this.dummy, 'dummy-data');
	}
}
