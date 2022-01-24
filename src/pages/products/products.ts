import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from "../../models/product.dto";
import { ProductService } from "../../services/domain/product.service";
import { API_CONFIG } from "../../config/api.config";

@IonicPage()
@Component({
    selector: 'page-products',
    templateUrl: 'products.html',
})
export class ProductsPage {

    items: ProductDTO[] = [];
    page: number = 0;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public productService: ProductService,
        public loadCtrl: LoadingController) {
    }

    ionViewDidLoad() {
        this.loadData();
    }

    loadData() {
        let cat_id = this.navParams.get("category_id");
        const loader = this.presentLoading();
        this.productService.findByCategory(cat_id, this.page, 10)
            .subscribe(res => {
                let start = this.items.length
                this.items = this.items.concat(res['content']);
                let end = this.items.length - 1;
                loader.dismiss();
                this.loadImageUrls(start, end);
            }, error => {
                loader.dismiss();
            });
    }

    loadImageUrls(start: number, end: number) {
        for (let i = start; i < end; i++) {
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
    doRefresh(event) {
        this.page = 0;
        this.items = [];
        this.loadData();
        setTimeout(() => {
            event.complete();
        }, 1000);
    }

    doInfinite(infiniteScroll: InfiniteScroll) {
        this.page++;
        this.loadData();
        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);

    }

}
