import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private expiryKey = 'expiry';
  private expiryWarningShown = false;

  private sessionExpiredSubject = new BehaviorSubject<boolean>(false);
  public sessionExpired$: Observable<boolean> = this.sessionExpiredSubject.asObservable();

  constructor() {
    this.checkSession();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token; 
  }

  login(login: LoginModel, expiryMinutes: number = 30): Promise<boolean> { 
    return new Promise<boolean>((resolve) => { 
      if (login.name === 'test' && login.password === '1234') {
        localStorage.setItem(this.tokenKey, 'test');
        this.setExpiry(expiryMinutes);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve) => { 
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.expiryKey);
      resolve();
    });
  }

  setExpiry(minutes: number = 30) {
    const now = new Date();
    const expiry = new Date(now.getTime() + minutes * 60 * 1000);
    localStorage.setItem(this.expiryKey, expiry.toString());
  }

  clearExpirySetting() {
    this.sessionExpiredSubject.next(false);
    this.expiryWarningShown = false;
  }

  isSessionExpired(): boolean {
    const expiryString = localStorage.getItem(this.expiryKey);
    if (!expiryString) return true;

    try { 
      const expiry = new Date(expiryString);
      return expiry < new Date();
    } catch (error) {
      return true; 
    }
  }

  private checkSession() {
    if (this.isSessionExpired() && this.isLoggedIn()) {
      this.sessionExpiredSubject.next(true);
      if (!this.expiryWarningShown) {
        this.expiryWarningShown = true; 
      }
    } else {
      this.clearExpirySetting(); 
    }

    setTimeout(() => {
      this.checkSession(); 
    }, 60000); 
  }
}