import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {StorageService} from '../services/storage.service';
import {AlertController} from "ionic-angular";
import {FieldMessage} from "../models/fieldmessage";

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
                    case 422:
                        this.handle422(errorObj);
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
            buttons: [{text: "ok"}]
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

    private handle422(errorObj) {
        let alert = this.alertController.create({
            title: 'Error 422: Validation',
            message: this.getErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [{text: "ok"}]
        });
        alert.present();
    }

    private getErrors(messages: FieldMessage[]): string {
        let str: string = '';
        for (let i = 0; i < messages.length; i++) {
            str += '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message
        }
        return str;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
