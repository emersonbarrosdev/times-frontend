import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private authService: AuthService) {}

  private getUserKey(key: string): string {
    const currentUser = this.authService.currentUserValue;
    return currentUser ? `${currentUser.username}_${key}` : key;
  }

  setItem(key: string, value: any): void {
    const userKey = this.getUserKey(key);
    localStorage.setItem(userKey, JSON.stringify(value));
  }

  getItem(key: string): any {
    const userKey = this.getUserKey(key);
    const item = localStorage.getItem(userKey);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    const userKey = this.getUserKey(key);
    localStorage.removeItem(userKey);
  }
}
