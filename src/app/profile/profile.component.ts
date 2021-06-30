import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  email: string;
  country: string;
  city: string;
  password: string;
  passwordCheck: string;
  firstName: string;
  lastName: string;
  profilePicture: File;
  message: string;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void { }

  update(): void {
    if (this.validate()) {
      const formData = new FormData();
      // formData.append('username', this.username);
      // formData.append('email', this.email);
      // formData.append('password', this.password);
      // formData.append('country', this.country);
      // formData.append('city', this.city);
      // formData.append('firstName', this.firstName);
      // formData.append('lastName', this.lastName);
      // formData.append('profilePicture', this.profilePicture);
      // formData.append('type', 'User');
      // formData.append('role', 'basic');

      const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
      this.httpService.post('users', formData, headers).subscribe((user: User) => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['home']);
        } else {
          this.message = 'Neispravni podaci';
        }
      });
    }
  }

  onFileSelected(event): void {
    this.profilePicture = (event.target as HTMLInputElement).files[0];
  }

  validate(): boolean {
    if (!this.username) {
      this.message = 'Morate uneti korisnicko ime!';
      return false;
    }
    if (!this.email) {
      this.message = 'Morate uneti email!';
      return false;
    }

    return this.checkRegex();
  }

  checkRegex(): boolean {
    let error = false;
    const regExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,24}/g;
    if (! regExp.test(this.password)) {
      this.message = 'Sifra mora imati najmanje 8, a najvise 24 karaktera. Mora sadrzati bar jedno malo i veliko slovo, bar jednu cifru i jedan specijalan karakter!';
      error = false; // change to false to enable
    }
    if (this.password !== this.passwordCheck) {
      this.message = 'Sifre se ne podudaraju!';
      error = true;
    }

    return !error;
  }
}
