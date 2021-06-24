import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: string;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {}

  login(): void {
    const data = {
      username: this.username,
      password: this.password
    };

    this.httpService.post('users/authenticate', data).subscribe(
      (user: User) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['home']);
        } else {
          this.message = 'Neispravni podaci';
        }
      });
  }
}
