import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CartItem} from "../../models/cart-item";
import {API_CONFIG} from "../../config/api.config";
import {ProductService} from "../../services/domain/product.service";
import {CartService} from "../../services/domain/cart.service";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {
    items: CartItem[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public cartService: CartService,
        public productService: ProductService) {
    }

    ionViewDidLoad() {
        let cart = this.cartService.getCart();
        this.items = cart.items;
        this.loadImageUrls();
    }

    loadImageUrls() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            this.productService.getSmallImageFromBucket(item.product.id)
                .subscribe(() => {
                    item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`
                }, error => {
                })
        }
    }

}
