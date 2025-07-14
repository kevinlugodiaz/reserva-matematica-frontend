import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-period',
  imports: [RouterLink],
  templateUrl: './new-period.component.html',
  styleUrl: './new-period.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewPeriodComponent {}
