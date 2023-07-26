import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  nameFirst: string;
  nameLast: string;
  myEmail: string;
  myPassword: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthServiceProvider,
    public database: DatabaseProvider,
    public toaster: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async button_Register() {
    console.log("Attempting to register...");
    try {
      await this.auth.doRegister(this.myEmail, this.myPassword);
      await this.database.addDocument('users', {
        email: this.myEmail,
        first: this.nameFirst,
        last: this.nameLast
      });
      let toast = this.toaster.create({
        message: 'Registered successfully!',
        duration: 3000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: "dismiss"
      });
      toast.present();
    } catch (e) {
      console.log("Failed to register!");
      console.log(e);
      let toast = this.toaster.create({
        message: 'Failed to register!',
        duration: 3000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: "dismiss"
      });
      toast.present();
    }
  }

}
