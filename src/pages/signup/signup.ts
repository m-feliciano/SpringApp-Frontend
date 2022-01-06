import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StateService} from "../../services/domain/state.service";
import {CityService} from "../../services/domain/city.service";
import {StateDTO} from "../../models/state.dto";
import {CityDTO} from "../../models/city.dto";
import {ClientService} from "../../services/domain/client.service";

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
    states: StateDTO[];
    cities: CityDTO[];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private formBuilder: FormBuilder,
        private stateService: StateService,
        private cityService: CityService,
        private clientService: ClientService,
        private alertController: AlertController
    ) {
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

    ionViewDidLoad() {
        this.stateService.findAll()
            .subscribe(res => {
                this.states = res;
                this.formGroup.controls.stateId.setValue(this.states[0].id);
                this.updateCities();
            }, error => {
            })
    }

    signupUser() {
        this.clientService.insert(this.formGroup.value).subscribe(res => {
            this.showInsertOk();
        }, error => {
        })
    }

    updateCities() {
        let state_id = this.formGroup.value.stateId;
        this.cityService.findAll(state_id).subscribe(res => {
            this.cities = res;
            this.formGroup.controls.cityId.setValue(null);
        }, error => {
        })
    }

    private showInsertOk() {
        let alert = this.alertController.create({
            title: "Success!",
            message: "Client register success!",
            enableBackdropDismiss: false,
            buttons: [{
                text: "ok",
                handler: () => {
                    this.navCtrl.pop();
                }
            }]
        })
        alert.present();
    }
}
