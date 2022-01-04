import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    formGroup: FormGroup;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            name: ['Vitor', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            email: ['feliciano@keemail.me', [Validators.required, Validators.email]],
            type: ['1', [Validators.required]],
            cpfOrCnpj: ['98692027057', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
            password: ['123', [Validators.required]],
            street: ['Avenida Brazil', [Validators.required]],
            number: ['100', [Validators.required]],
            complement: ['', []],
            district: ['Niteroi', []],
            cep: ['34893822', [Validators.required]],
            phone1: ['900900900', [Validators.required]],
            phone2: ['', []],
            stateId: [null, [Validators.required]],
            cityId: [null, [Validators.required]]
        })
    }

    signupUser() {

    }

}
