import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProductDTO} from "../../models/product.dto";
import {ProductService} from "../../services/domain/product.service";
import {API_CONFIG} from "../../config/api.config";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-product-detail',
    templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

    item: ProductDTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private productService: ProductService) {
    }

    ionViewDidLoad() {
        let prod_id = this.navParams.get("product_id");
        this.productService.findById(prod_id)
            .subscribe(res => {
                this.item = res;
                this.getImageUrlIfExists();
            }, error => {
            });
    }

    getImageUrlIfExists() {
        let item = this.item;
        this.productService.getImageFromBucket(item.id)
            .subscribe(() => {
                item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}.jpg`
            }, error => {
            })
    }

}
