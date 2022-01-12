import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClientDTO } from '../../models/client.dto';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    client: ClientDTO;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private storage: StorageService,
        private clientService: ClientService) {
    }

    ionViewDidLoad() {
        let localUser = this.storage.getLocalUser()
        if (localUser && localUser.email) {
            this.clientService.findByEmail(localUser.email)
                .subscribe((response: ClientDTO) => {
                    this.client = response;
                    this.getImageIfExists();
                    //search image
                }, (error: { status: number; }) => {
                    if (error.status == 403) {
                        this.navCtrl.setRoot('HomePage');
                    }
                })
        } else {
            this.navCtrl.setRoot('HomePage');
        }
    }

    getImageIfExists() {
        this.clientService.getImageFromBucket(this.client.id)
            .subscribe(() => {
                this.client.imageUrl =
                    `${API_CONFIG.bucketBaseUrl}/cp${this.client.id}.jpg`
            }, (error: any) => { })
    }
}
