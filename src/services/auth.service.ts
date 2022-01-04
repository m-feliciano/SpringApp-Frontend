import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtHelper} from "angular2-jwt";
import {API_CONFIG} from "../config/api.config";
import {CredentialsDTO} from "../models/credentials.dto";
import {LocalUser} from "../models/local_user";
import {StorageService} from "./storage.service";

@Injectable()
export class AuthService {

    JwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    authenticate(creds: CredentialsDTO) {
        return this.http.post(API_CONFIG.loginUrl, creds, {
            observe: "response",
            responseType: "text" // to avoid json parsing error
        });
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {},{
            observe: "response",
            responseType: "text" // to avoid json parsing error
        });
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7)
        let user: LocalUser = {
            token: tok,
            email: this.JwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null)
    }

}
