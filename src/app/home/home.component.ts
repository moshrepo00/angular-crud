import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataProviderService} from '../data-provider.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
    // nodeTestPost(): Observable<any> {
    //     const headers = new HttpHeaders()
    //     // .set('Authorization', 'my-auth-token')
    //         .set('Content-Type', 'application/json');
    //     return this.http.post(`${this.dataService.endpoint}/tickets/create`, JSON.stringify(this.body), {
    //         headers: headers,
    //         responseType: 'text'
    //     });
    // }
    //

    constructor(public http: HttpClient, public dataService: DataProviderService) {
    }

    ngOnInit() {
        this.dataService.getEvents()
            .subscribe(data => console.log('testing node api', data));
    }

}
