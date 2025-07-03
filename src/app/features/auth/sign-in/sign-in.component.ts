import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FocusTrap } from 'primeng/focustrap';
import { AutoFocus } from 'primeng/autofocus';

@Component({
  selector: 'app-sign-in',
  imports: [
    NgOptimizedImage,
    InputText,
    Button,
    IconField,
    InputIcon,
    FocusTrap,
    AutoFocus
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SignInComponent {

}
