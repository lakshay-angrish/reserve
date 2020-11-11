import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email: string;
  restaurantName: string;
  restaurantAddress: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('home');
    }
  }

  signUp(): void {
    const body = {
      email: this.email,
      restaurantName: this.restaurantName,
      restaurantAddress: this.restaurantAddress,
      password: this.password,
    };

    this.http
      .post('http://localhost:3000/user/signUp', body, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          console.log(response);
          alert('User Created! Login to continue')
          this.router.navigateByUrl('');
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }
}
