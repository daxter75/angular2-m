import {Component, OnInit} from "angular2/core";
import {ContactService} from "./contact.service";
import {Contact} from "./contact";
import {Router, RouteParams} from "angular2/router";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";

@Component({
    template: `
        <form [ngFormModel]="myForm" (ngSubmit)="onSubmit(myForm.value)">
            <div>
                <label for="first-name">First name:</label>
                <input type="text" id="first-name"
                [ngFormControl]="myForm.controls['firstName']"
                #firstName="ngForm"
                >
                <span *ngIf="!firstName.valid">not valid</span>
            </div>
            <div>
                <label for="last-name">Last name:</label>
                <input type="text" id="last-name"
                [ngFormControl]="myForm.controls['lastName']"
                >
            </div>
            <div>
                <label for="phone">Phone:</label>
                <input type="text" id="phone"
                [ngFormControl]="myForm.controls['phone']"
                >
            </div>
            <div>
                <label for="last-name">email:</label>
                <input type="text" id="email"
                [ngFormControl]="myForm.controls['email']"
                >
            </div>
            <button type="submit" [disabled]="!myForm.valid">Create Contact</button>
        </form>   
    `,
    providers: [ContactService],
    styles: [`
        label {
            display: inline-block;
            width: 140px;
        }
        input {
            width: 250px;
        }
        .ng-invalid {
            border: 1px solid red;
        }
    `]
})

export class NewContactComponent implements OnInit {

    myForm: ControlGroup;

    constructor (private _contactService: ContactService, private _router: Router, private _routeParams: RouteParams, private _formBuilder: FormBuilder) {}


    onSubmit(value) {
        this._contactService.insertContact(value);
        this._router.navigate(['Contacts']);
    }

    ngOnInit():any {
        this.myForm = this._formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': [this._routeParams.get('lastName'), Validators.required],
            'phone': ['', Validators.required],
            'email': ['', Validators.required]
        });
    }
}