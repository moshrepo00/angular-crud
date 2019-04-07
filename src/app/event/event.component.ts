import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DataProviderService} from '../data-provider.service';
import {forkJoin} from 'rxjs';
import * as moment from 'moment';


@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    currentEvent: Array<any>;
    ticketSelected: boolean;
    showModal: boolean;

    constructor(public router: Router, public dataService: DataProviderService) {
    }

    activateModal() {
        console.log('clicked');
        this.showModal = true;
    }

    handleTicketUpdate() {
        this.ticketSelected = false;
        this.dataService.currentEvent[0].tickets.forEach((ticket) => {
            if (ticket.selected) {
                this.ticketSelected = true;
            }
        });

    }

    preventDef(event) {
        event.preventDefault();
    }

    ngOnInit() {
        // const myDate = moment('2019-06-01 19:00:00').format('D MMM (ddd) YYYY hA');
        this.dataService.getEvents()
            .subscribe((data: Array<any>) => {
                this.dataService.currentEvent = data.filter((event: any) => this.router.url === event.url);
                if (moment(this.dataService.currentEvent[0].date).format('D MMM (ddd) YYYY hA') !== 'Invalid date') {
                    this.dataService.currentEvent[0].date = moment(this.dataService.currentEvent[0].date).format('D MMM (ddd) YYYY hA');
                }
                this.dataService.currentEvent[0].tickets.forEach((ticket) => {
                    ticket.selected = 0;
                    if (+ticket.available) {
                        ticket.available = +ticket.available;
                    } else if (ticket.available === '0') {
                        console.log('in here');
                        ticket.available = 0;
                    }
                });
                console.log('testing current event', this.dataService.currentEvent);
            });

    }

}
