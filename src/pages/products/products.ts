import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from "../../models/product.dto";
import { ProductService } from "../../services/domain/product.service";
import { API_CONFIG } from "../../config/api.config";

@IonicPage()
@Component({
    selector: 'page-products',
    templateUrl: 'products.html',
})
export class ProductsPage {

    items: ProductDTO[];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public productService: ProductService,
        public loadCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        let cat_id = this.navParams.get("category_id");
        const loader = this.presentLoading();
        this.productService.findByCategory(cat_id)
            .subscribe(res => {
                this.items = res['content'];
                loader.dismiss();
                this.loadImageUrls();
            }, error => {
            });
    }

    loadImageUrls() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            this.productService.getSmallImageFromBucket(item.id)
                .subscribe(() => {
                    item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
                }, error => {
                })
        }
    }

    showDetail(product_id: string) {
        this.navCtrl.push("ProductDetailPage", { product_id: product_id });
    }

    presentLoading() {
        const loading = this.loadCtrl.create({
            content: 'Loading...',
            duration: 2000
        });
        loading.present();
        return loading;
    }

}
