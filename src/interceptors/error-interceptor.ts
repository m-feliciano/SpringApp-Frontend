import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {StorageService} from '../services/storage.service';
import {AlertController} from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error) => {
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }
                console.log("Error detected by interceptor:");
                console.log(errorObj);

                switch (errorObj.status) {
                    case 403:
                        this.handle403();
                        break;
                    case 401:
                        this.handle401();
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                        break;
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    private handle403() {
        this.storage.setLocalUser(null);
    }

    private handle401() {
        let alert = this.alertController.create({
            title: "Error 401: authentication failed",
            message: "Email or passeord incorrect",
            enableBackdropDismiss: false,
            buttons: [{ text: "ok" }]
        });
        alert.present();
    }

    private handleDefaultError(errorObj) {
        let alert = this.alertController.create({
            title: `Error ${errorObj.status}: ${errorObj.status}`,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{text: "ok"}]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
