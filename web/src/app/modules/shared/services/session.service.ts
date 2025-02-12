import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionExpiredSubject = new BehaviorSubject<boolean>(false);
  public sessionExpired$: Observable<boolean> = this.sessionExpiredSubject.asObservable();

  constructor(private authService: AuthService) {
    this.authService.sessionExpired$.subscribe((expired) => {
      this.sessionExpiredSubject.next(expired);
    });
  }
}
