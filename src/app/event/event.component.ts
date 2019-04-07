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

    constructor(public router: Router, public dataService: DataProviderService) {
    }

    checkout(eventId, ticketId, available, selected) {
        console.log(eventId, ticketId, available, selected);
        this.dataService.updateTickets(eventId, ticketId, available, selected)
            .subscribe((data) => console.log('ticket updated'));
    }

    updateAllTickets() {
        console.log('update all tickets', this.currentEvent);
        const observableArr = [];
        this.currentEvent[0].tickets.forEach((item) => {
            const observable = this.dataService.updateTickets(this.currentEvent[0]._id, item._id, item.available, item.selected);
            observableArr.push(observable);
        });
        forkJoin(observableArr)
            .subscribe(() => console.log('tickets updated'));
    }

    ngOnInit() {
        // const myDate = moment('2019-06-01 19:00:00').format('D MMM (ddd) YYYY hA');
        this.dataService.getEvents()
            .subscribe((data: Array<any>) => {
                this.currentEvent = data.filter((event: any) => this.router.url === event.url);
                this.currentEvent[0].date = moment(this.currentEvent[0].date).format('D MMM (ddd) YYYY hA');
                this.currentEvent[0].tickets.forEach((ticket) => {
                    ticket.selected = 0;
                    if (+ticket.available) {
                        ticket.available = +ticket.available;
                    } else {
                        ticket.available = 0;
                    }
                });
                console.log('testing current event', this.currentEvent);
            });

    }

}
