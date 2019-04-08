import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataProviderService} from '../data-provider.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    formObj = {
        firstName: '',
        lastName: '',
        email: '',
        number: ''
    };

    showModal: boolean;

    currentEvent: Array<any>;
    //
    // checkout(eventId, ticketId, available, selected) {
    //     console.log(eventId, ticketId, available, selected);
    //     this.dataService.updateTickets(eventId, ticketId, available, selected)
    //         .subscribe((data) => console.log('ticket updated'));
    // }

    updateAllTickets() {
        console.log('update all tickets', this.dataService.currentEvent);
        const observableArr = [];
        this.dataService.currentEvent[0].tickets.forEach((item) => {
            if (item.available !== 'null') {
                const observable = this.dataService.updateTickets(this.dataService.currentEvent[0]._id, item._id, item.available, item.selected);
                observableArr.push(observable);
            }
        });
        forkJoin(observableArr)
            .subscribe(() => console.log('tickets updated'));

        this.dataService.createGuest(this.dataService.currentEvent[0]._id, this.formObj.firstName, this.formObj.lastName, this.formObj.email, this.formObj.number)
            .subscribe((data) => console.log('guest created'));
    }

    constructor(public router: Router, public dataService: DataProviderService) {
    }

    navigate() {
        this.router.navigate(['/']);
    }

    ngOnInit() {

        this.dataService.getEvents()
            .subscribe((data: Array<any>) => {
                this.currentEvent = data.filter((event: any) => this.router.url.includes(event.url));
                if (!this.dataService.currentEvent) {
                    this.router.navigate([this.currentEvent[0].url]);
                }
                console.log('testing current event', this.currentEvent);
            });

    }

}
