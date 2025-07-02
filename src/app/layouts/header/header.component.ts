import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    Button,
    Avatar,
    Menu
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  options = signal([
    {
      label: 'Perfil',
      items: [
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-sign-out',
          command: () => {
            // Aquí puedes agregar la lógica para cerrar sesión
            console.log('Cerrar sesión');
          }
        }
      ]
    }
  ]);
}
