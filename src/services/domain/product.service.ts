import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {API_CONFIG} from "../../config/api.config";

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) {
    }

    findByCategory(category_id) {
        return this.http.get(`${API_CONFIG.baseUrl}/products/?categories=${category_id}`)
    }
}
