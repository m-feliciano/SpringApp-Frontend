import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductDTO} from "../../models/product.dto";
import {ProductService} from "../../services/domain/product.service";

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-products',
    templateUrl: 'products.html',
})
export class ProductsPage {

    items: ProductDTO[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private productService: ProductService) {
    }

    ionViewDidLoad() {
        let cat_id = this.navParams.get("category_id");
        this.productService.findByCategory(cat_id)
            .subscribe(res => {
                this.items = res['content']
            }, error => {
            });
    }

}
