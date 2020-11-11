import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  addReservation(): void {
    return;
  }
}
