import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7283/api/Login';

  constructor(private http: HttpClient) { }

  login(userId: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/ValidateUser`, { userId, password }).pipe(
      tap(res => {
        const data = res?.data || res?.Data || res?.gridData;
        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
