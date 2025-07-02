import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tab, TabList, Tabs } from 'primeng/tabs';

@Component({
  selector: 'app-gen-info',
  imports: [
    Tabs,
    TabList,
    Tab
  ],
  templateUrl: './gen-info.component.html',
  styleUrl: './gen-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GenInfoComponent {
}
