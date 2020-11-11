import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css'],
})
export class EditReservationComponent implements OnInit {
  email: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  restaurantName: string;
  id: string;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.restaurantName = sessionStorage.getItem('restaurantName');
    // this.date = new Date(history.state.data.date);
    this.date = new Date(history.state.data.date)
      .toISOString()
      .substring(0, 10);
    this.email = history.state.data.email;
    this.time = history.state.data.time;
    this.name = history.state.data.name;
    this.phone = history.state.data.phone;
    this.id = history.state.data._id;
  }

  updateReservation(): void {
    const ownerID = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    const body = {
      ownerID,
      time: this.time,
      date: new Date(this.date).toDateString(),
    };

    this.http
      .patch('http://localhost:3000/reservation/' + this.id, body, {
        responseType: 'json',
        headers: httpHeaders,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigateByUrl('home');
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
  }
  logOut(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
}
