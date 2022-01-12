import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { ClientDTO } from '../../models/client.dto';
import { OrderDTO } from '../../models/order.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})

export class AddressPage {

  items: AddressDTO[];

  order: OrderDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClientService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email)
        .subscribe((response: ClientDTO) => {
          this.items = response["address"];

          let cart = this.cartService.getCart();

          this.order = {
            client: { id: response["id"] },
            deliveryAddress: null,
            payment: null,
            items: cart.items.map(i => {
              return { quantity: i.quantity, product: { id: i.product.id } }
            })
          }
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

  nextPage(item: AddressDTO) {
    this.order.deliveryAddress = { id: item.id };
    console.log(this.order);
  }
}


// this.items = [{
//   id: "1",
//   street: "Av Nove de Julho",
//   number: "300",
//   complement: "10 Floor",
//   district: "Centro",
//   cep: "09876-543",
//   city: {
//     id: "1",
//     name: "São Paulo",
//     state: {
//       id: "1",
//       name: "São Paulo"
//     }
//   }
// }];