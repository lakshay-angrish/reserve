import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  reservations = [];
  restaurantName: string;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('id')) {
      this.restaurantName = sessionStorage.getItem('restaurantName');
      this.getAllReservations();
    } else {
      this.router.navigateByUrl('');
    }
  }

  goToAddReservationPage(): void {
    this.router.navigateByUrl('/add-reservation');
  }

  getAllReservations(): void {
    const ownerID = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    this.http
      .get('http://localhost:3000/reservation/' + ownerID, {
        responseType: 'json',
        headers: httpHeaders,
      })
      .subscribe(
        (response: any[]) => {
          this.reservations = response;
          console.log(response);
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
  }

  deleteReservation(id): void {
    const ownerID = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    this.http
      .request('delete', 'http://localhost:3000/reservation/' + id, {
        body: {
          ownerID,
        },
        responseType: 'json',
        headers: httpHeaders,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          window.location.reload();
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
  }

  editReservation(reservation): void {
    this.router.navigate(['edit-reservation'], {
      state: {
        data: reservation,
      },
    });
  }

  logOut(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
}
