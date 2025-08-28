import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '';

  get(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  post<T>(endpoint: string, data: T) {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: T) {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data);
  }

  patch<T>(endpoint: string, data: T) {
    return this.http.patch(`${this.baseUrl}/${endpoint}`, data);
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }
}
