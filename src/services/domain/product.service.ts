import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {API_CONFIG} from "../../config/api.config";
import {Observable} from "rxjs";

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {
    }

    findByCategory(category_id) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}`)
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        return this.http.get(
            `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`,
            {responseType: "blob"}) //blob: type= image
    }
}
