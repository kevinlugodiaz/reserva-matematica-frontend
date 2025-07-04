import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payment-control',
  imports: [],
  standalone: true,
  templateUrl: './payment-control.component.html',
  styleUrl: './payment-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PaymentControlComponent {

}
