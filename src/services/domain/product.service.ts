import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {API_CONFIG} from "../../config/api.config";
import {Observable} from "rxjs";
import {ProductDTO} from "../../models/product.dto";

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {
    }

    findByCategory(category_id) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}`)
    }

    findById(product_id) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`)
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        return this.http.get(
            `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`,
            {responseType: "blob"}) //blob: type= image
    }

    getImageFromBucket(id: string): Observable<any> {
        return this.http.get(
            `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`,
            {responseType: "blob"}) //blob: type= image
    }
}
