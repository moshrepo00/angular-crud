import {Component} from '@angular/core';
import {DataProviderService} from './data-provider.service';
import {Router, NavigationEnd} from '@angular/router';
import {Cacheable} from 'ngx-cacheable';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'event-ticketing-angular';


    constructor(public router: Router, public dataService: DataProviderService) {
        this.dataService.getEvents()
            .subscribe((data: Array<any>) => {
                console.log('app component', data);
                this.dataService.events = data;
            });
    }
}
