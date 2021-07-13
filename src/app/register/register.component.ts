import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  country: string;
  city: string;
  password: string;
  passwordCheck: string;
  firstName: string;
  lastName: string;
  profilePicture: File;

  alertClosed = true;
  alertMessage: string;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {}

  register(): void {
    if (this.check()) {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('country', this.country);
      formData.append('city', this.city);
      formData.append('firstName', this.firstName);
      formData.append('lastName', this.lastName);
      formData.append('profilePicture', this.profilePicture);
      formData.append('type', 'User');
      formData.append('role', 'basic');

      const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
      this.httpService.post('users', formData, headers).subscribe((user: User) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['home']);
        } else {
          this.alertMessage = 'Doslo je do greske';
          this.alertClosed = false;
        }
      }, (err) => {
        this.alertMessage = 'Doslo je do greske';
        this.alertClosed = false;
      });
    }
  }

  onFileSelected(event): void {
    this.profilePicture = (event.target as HTMLInputElement).files[0];
  }

  check(): boolean {
    if (!this.username) {
      this.alertMessage = 'Morate uneti korisnicko ime!';
      this.alertClosed = false;
      return false;
    }
    if (!this.email) {
      this.alertMessage = 'Morate uneti email!';
      this.alertClosed = false;
      return false;
    }

    const regExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,24}/g;
    if (! regExp.test(this.password)) {
      this.alertMessage = 'Sifra mora imati najmanje 8, a najvise 24 karaktera. Mora sadrzati bar jedno malo i veliko slovo, bar jednu cifru i jedan specijalan karakter!';
      this.alertClosed = false;
      return true; // change to false to enable
    }
    if (this.password !== this.passwordCheck) {
      this.alertMessage = 'Sifre se ne podudaraju!';
      this.alertClosed = false;
      return false;
    }
    return true;
  }
}
