import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataProviderService} from './data-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'event-ticketing-angular';

  constructor(public http: HttpClient, public dataService: DataProviderService) {
    this.dataService.getEvents()
        .subscribe(data => {
          console.log('testing node api', data);
          this.dataService.events = data;
          console.log('events in data service', this.dataService.events);
        });
  }
}
