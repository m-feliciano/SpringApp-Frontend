import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { ProductDTO } from "../../models/product.dto";

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {
    }

    findByCategory(category_id: string, page: number = 0, linesPerPage: number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}&page=${page}&linesPerPage=${linesPerPage}`)
    }

    findById(product_id: string) {
        return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${product_id}`)
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        return this.http.get(
            `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`,
            { responseType: "blob" }) //blob: type= image
    }

    getImageFromBucket(id: string): Observable<any> {
        return this.http.get(
            `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`,
            { responseType: "blob" }) //blob: type= image
    }
}
