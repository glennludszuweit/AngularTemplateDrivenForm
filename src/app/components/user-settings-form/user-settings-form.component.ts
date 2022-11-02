import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserSettings } from 'src/app/interfaces/user-settings';
import { UserSettingsService } from 'src/app/services/user-settings.service';

@Component({
  selector: 'tdf-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {
  subscriptionTypes!: Observable<string[]>;
  originalUserSettings: UserSettings = {
    name: 'Tony',
    emailOffers: true,
    interfaceStyle: 'light',
    subscriptionType: 'Annual',
    notes: 'Test notes',
  };
  userSettings: UserSettings = { ...this.originalUserSettings };
  postError: boolean = false;
  postErrorMessage: string = '';

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.subscriptionTypes = this.userSettingsService.getSubscriptionTypes();
  }

  onHttpError(error: any) {
    console.log(error);
    this.postError = true;
    this.postErrorMessage = error.error.errorMessage;
  }

  onBlur(field: NgModel) {
    console.log(field.valid);
  }

  onSubmit(form: NgForm) {
    console.log(form.valid);
    if (form.valid) {
      this.userSettingsService
        .postUserSettingsForm(this.userSettings)
        .subscribe({
          next: (result) => console.log(result),
          error: (error) => this.onHttpError(error),
        });
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix errors!';
    }
  }
}
