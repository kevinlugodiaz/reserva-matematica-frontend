import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiResponse } from '@core/interfaces/api-response.interface';
import { environment } from '@env';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  get<T>(endpoint: string) {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`);
  }

  getFile(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { responseType: 'blob' }).pipe(
      tap((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'descarga.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      }),
    );
  }

  post<T, R>(endpoint: string, data: R) {
    return this.http.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
  }

  put<T, R>(endpoint: string, data: R) {
    return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
  }

  patch<T, R>(endpoint: string, data: R) {
    return this.http.patch<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`);
  }
}
