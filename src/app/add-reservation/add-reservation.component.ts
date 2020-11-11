import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
})
export class AddReservationComponent implements OnInit {
  email: string;
  name: string;
  phone: string;
  date: Date;
  time: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  addReservation(): void {
    const ownerID = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    const body = {
      email: this.email,
      name: this.name,
      phone: this.phone,
      time: this.time,
      date: new Date(this.date).toDateString(),
    };

    this.http
      .post('http://localhost:3000/reservation/' + ownerID, body, {
        responseType: 'json',
        headers: httpHeaders,
      })
      .subscribe(
        (response: any[]) => {
          console.log(response);
          this.router.navigateByUrl('home');
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
  }
}
