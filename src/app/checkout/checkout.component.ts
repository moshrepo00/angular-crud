import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataProviderService} from '../data-provider.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

    formObj = {};

    currentEvent: Array<any>;

    onSubmit() {
        console.log('type submit button');
    }

    someother() {
        console.log('some other');
    }

    constructor(public router: Router, public dataService: DataProviderService) {
    }

    ngOnInit() {
        this.dataService.getEvents()
            .subscribe((data: Array<any>) => {
                this.currentEvent = data.filter((event: any) => this.router.url.includes(event.url));
                console.log('testing current event', this.currentEvent);
            });

    }

}
