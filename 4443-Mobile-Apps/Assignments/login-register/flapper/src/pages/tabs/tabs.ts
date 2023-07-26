import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = RegisterPage;

  constructor(public navCtrl: NavController) {}

}
