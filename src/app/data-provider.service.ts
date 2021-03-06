import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Cacheable} from 'ngx-cacheable';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {

    // endpoint = 'http://localhost:8000';
    endpoint = 'https://event-node-api.herokuapp.com';
    events: Array<any>;
    currentEvent: Array<any>;

    @Cacheable()
    getEvents(): Observable<any> {
        return this.http.get(`${this.endpoint}/events/all`);
    }

    updateTickets(eventId: string, ticketId: string, available: number, selected: number) {
        const ticketCount = available - selected;
        const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        const reqBody = {
            available: ticketCount.toString()
        };
        // const ticketsRemaining = this.t
        return this.http.put(`${this.endpoint}/events/${eventId}/tickets/${ticketId}/update`, JSON.stringify(reqBody), headers);
    }

    createGuest(eventId: string, firstName: string, lastName: string, phone: string, email: string) {
        const headers = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        const reqBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone.toString()
        };
        return this.http.post(`${this.endpoint}/events/${eventId}/guests/create`, JSON.stringify(reqBody), headers);
    }

    constructor(public http: HttpClient) {
    }
}
