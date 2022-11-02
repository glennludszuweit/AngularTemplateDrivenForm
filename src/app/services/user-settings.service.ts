import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from '../interfaces/user-settings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  constructor(private http: HttpClient) {}

  postUserSettingsForm(userSettings: UserSettings): Observable<any> {
    // return of(userSettings);
    return this.http.post(
      'https://putsreq.com/APAUYraCdChgLf8E9q4E',
      userSettings
    );
  }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }
}
