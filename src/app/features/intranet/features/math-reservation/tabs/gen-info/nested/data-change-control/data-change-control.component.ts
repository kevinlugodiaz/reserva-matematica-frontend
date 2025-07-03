import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-data-change-control',
  imports: [],
  templateUrl: './data-change-control.component.html',
  styleUrl: './data-change-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DataChangeControlComponent {

}
