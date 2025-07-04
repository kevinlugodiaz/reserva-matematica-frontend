import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable({
	providedIn: 'root',
})
export class ExcelService {
	private EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
	private EXCEL_EXTENSION = '.xlsx';

	async exportData(data: any[], name: string | null = null): Promise<void> {
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook: XLSX.WorkBook = {
			Sheets: { data: worksheet },
			SheetNames: ['data'],
		};

		const excelBuffer: ArrayBuffer = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'array',
		});

		const blob: Blob = new Blob([excelBuffer], { type: this.EXCEL_TYPE });

		const fileName = `${name ?? 'export'}_${new Date().toISOString().slice(0, 10)}${this.EXCEL_EXTENSION}`;
		FileSaver.saveAs(blob, fileName);
	}
}
