import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})

export class AddressPage {

  items: AddressDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [{
      id: "1",
      street: "Av Nove de Julho",
      number: "300",
      complement: "10 Floor",
      district: "Centro",
      cep: "09876-543",
      city: {
        id: "1",
        name: "São Paulo",
        state: {
          id: "1",
          name: "São Paulo"
        }
      }
    }];
  }
}
