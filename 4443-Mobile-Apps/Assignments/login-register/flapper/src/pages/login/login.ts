import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { App } from 'ionic-angular';

import { MapPage } from '../../pages/map/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginEmail: string;
  loginPassword: string;

  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    public toaster: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async button_Login() {

    console.log("Attempting to login...");
    try {
      await this.auth.doLogin(this.loginEmail, this.loginPassword);
      let toast = this.toaster.create({
        message: 'Logged in successfully!',
        duration: 3000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: "dismiss"
      });
      toast.present();
      //this.navCtrl.push(MapPage);
      //this.navCtrl.setRoot(MapPage);
      this.appCtrl.getRootNav().setRoot(MapPage);
    } catch (e) {
      console.log("Failed to login!");
      console.log(e);
      let toast = this.toaster.create({
        message: 'Failed to login!',
        duration: 3000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: "dismiss"
      });
      toast.present();
    }
  }

}

