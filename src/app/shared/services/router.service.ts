import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@shared/services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private readonly router = inject(Router);
  private readonly loaderService = inject(LoaderService);

  navigate(route: string[], loadingMessage?: string): void {
    this.navigateWithLoader(this.router.navigate(route), loadingMessage);
  }

  navigateByUrl(url: string, loadingMessage?: string): void {
    this.navigateWithLoader(this.router.navigateByUrl(url), loadingMessage);
  }

  private navigateWithLoader(promise: Promise<boolean>, loadingMessage?: string): void {
    this.loaderService.show(loadingMessage);
    promise.then(() => this.loaderService.hide());
  }
}
