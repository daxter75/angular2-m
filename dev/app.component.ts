import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
        <h3 \n\
            (click)="onSelect()"
            [class.clicked]="showDetail === true"
        >{{contact.firstName}} {{contact.lastName}}</h3>
        <input [(ngModel)]="contact.firstName" type="text">
        <div *ngIf="showDetail === true">
            Phone Number: {{contact.phone}}<br />
            E-Mail: {{contact.email}}
        </div>
    `,
    styleUrls: ["../src/css/app.css"]
})
export class AppComponent {
    public contact = {firstName: "Darko", lastName: "Dujin", phone: "012 3456789", email: "d@com.com"};
    
    public showDetail = false;
    
    onSelect() {
        this.showDetail = true;
    }
}