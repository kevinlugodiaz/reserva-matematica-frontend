import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-gen-report',
  imports: [Button, Tag],
  templateUrl: './gen-report.component.html',
  styleUrl: './gen-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GenReportComponent {}
