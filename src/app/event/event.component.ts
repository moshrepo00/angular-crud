import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {

    constructor(public router: Router) {
    }

    ngOnInit() {
        console.log(this.router.url);
    }

}
