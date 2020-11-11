import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { LoginComponent } from './login/login.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'home',
        component: ReservationsComponent
    },
    {
        path: 'add-reservation',
        component: AddReservationComponent
    },
    {
        path: 'edit-reservation',
        component: EditReservationComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
