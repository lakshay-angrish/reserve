import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  goToAddReservationPage(): void {
    this.router.navigateByUrl('/add-reservation');
  }
}
