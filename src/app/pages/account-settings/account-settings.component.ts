import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public link = document.querySelector('#theme');

  constructor( private settingService: SettingsService ) { }

  ngOnInit(): void {
    this.settingService.checkTheme();
  }

  changeTheme( theme: string ){

    this.settingService.changeTheme(theme);

  }

}
