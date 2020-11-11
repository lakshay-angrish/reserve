import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('home');
    }
  }

  logIn(): void {
    const body = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post('http://localhost:3000/user/logIn', body, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          console.log(response);
          sessionStorage.setItem('token', response.token);
          this.router.navigateByUrl('home');
        },
        (error) => {
          console.log(error);
          alert(error.message);
        }
      );
  }
}
