import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDTO } from "../../models/order.dto";
import { CartItem } from "../../models/cart-item";
import { CartService } from "../../services/domain/cart.service";
import { ClientDTO } from "../../models/client.dto";
import { AddressDTO } from "../../models/address.dto";
import { ClientService } from "../../services/domain/client.service";
import { OrderService } from "../../services/domain/order.service";

@IonicPage()
@Component({
    selector: 'page-order-confirmation',
    templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

    order: OrderDTO;
    cartItems: CartItem[];
    client: ClientDTO;
    address: AddressDTO;
    codeOrder: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public cartService: CartService,
        public clientService: ClientService,
        public orderService: OrderService) {
        this.order = this.navParams.get('order');
    }

    ionViewDidLoad() {
        this.cartItems = this.cartService.getCart().items;
        this.clientService.findById(this.order.client.id)
            .subscribe(res => {
                this.client = res as ClientDTO;
                this.address = this.findAddress(this.order.deliveryAddress.id, res['address']);
            },
                error => {
                    this.navCtrl.setRoot("HomePage");
                });
    }

    private findAddress(id: string, list: AddressDTO[]): AddressDTO {
        let position = list.findIndex(x => x.id === id);
        return list[position];
    }

    total() {
        return this.cartService.total();
    }

    back() {
        return this.navCtrl.setRoot("CartPage");
    }

    home() {
        return this.navCtrl.setRoot("CategoriesPage");
    }

    checkout() {
        this.orderService.insert(this.order)
            .subscribe(res => {
                this.cartService.createOrClearCart();
                this.codeOrder = this.extractId(res.headers.get('location'));
            }, error => {
                if (error.status === 403) {
                    this.navCtrl.setRoot("HomePage");
                }
            });
    }

    private extractId(location: string): string {
        let position = location.lastIndexOf('/');
        return location.substring(position + 1, location.length);
    }
}
