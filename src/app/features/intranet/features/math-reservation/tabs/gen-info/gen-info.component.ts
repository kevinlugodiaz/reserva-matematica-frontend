import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gen-info',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './gen-info.component.html',
  styleUrl: './gen-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GenInfoComponent {}
