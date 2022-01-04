import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import {CredentialsDTO} from '../../models/credentials.dto';
import {AuthService} from '../../services/auth.service';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    creds: CredentialsDTO = {
        email: "",
        password: ""
    };

    constructor(
        private navCtrl: NavController,
        private menu: MenuController,
        private auth: AuthService) {

    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewDidLeave() {
        this.menu.swipeEnable(true);
    }

    ionViewDidEnter() {
        this.auth.refreshToken()
            .subscribe(res => {
                this.auth.successfulLogin(res.headers.get("Authorization"));
                this.navCtrl.setRoot("CategoriesPage")
            }, error => {});
    }

    login() {
        this.auth.authenticate(this.creds)
            .subscribe(res => {
                this.auth.successfulLogin(res.headers.get("Authorization"));
                this.navCtrl.setRoot("CategoriesPage")
            }, error => {
            });
    }

    signup(){
        this.navCtrl.setRoot("SignupPage");
    }
}
