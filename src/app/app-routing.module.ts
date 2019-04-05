import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EventComponent} from './event/event.component';
import {CheckoutComponent} from './checkout/checkout.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':eventUrl',
        component: EventComponent
    },
    {
        path: ':eventUrl/checkout',
        component: CheckoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
