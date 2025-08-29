import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-intranet',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './intranet.component.html',
  styleUrl: './intranet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IntranetComponent {}
