import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataProviderService} from '../data-provider.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    loginFormObj = {
        name: '',
        email: ''
    };

    constructor(public dataService: DataProviderService) {
    }

    ngOnInit() {

    }

}
