import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FocusTrap } from 'primeng/focustrap';
import { AutoFocus } from 'primeng/autofocus';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '@shared/enums/app-routes.enums';
import { IntranetRoutes } from '../../intranet/shared/enums/intranet-routes.enum';

@Component({
  selector: 'app-sign-in',
  imports: [NgOptimizedImage, InputText, Button, IconField, InputIcon, FocusTrap, AutoFocus, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignInComponent {
  private readonly builder = inject(FormBuilder);
  private readonly router = inject(Router);

  form = this.builder.group({
    email: [''],
    password: [''],
  });

  onSubmit(): void {
    const values = this.form.getRawValue();
    if (values.email === 'admin' && values.password === '12345678') {
      this.router.navigateByUrl(`/${AppRoutes.intranet}/${IntranetRoutes.recordList}`);
    }
  }
}
