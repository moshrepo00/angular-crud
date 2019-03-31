import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DataProviderService} from '../data-provider.service';


@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {
    currentEvent: Array<any>;

    constructor(public router: Router, public dataService: DataProviderService) {
    }

    ngOnInit() {
        this.dataService.getEvents()
            .subscribe((data: Array<any>) => {
                this.currentEvent = data.filter((event: any) => this.router.url === event.url);
                // this.currentEvent = this.currentEvent((event) => this.)
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
