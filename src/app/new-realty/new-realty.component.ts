import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Realty } from '../models/realty.model';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-new-realty',
  templateUrl: './new-realty.component.html',
  styleUrls: ['./new-realty.component.css']
})
export class NewRealtyComponent implements OnInit {
  description: string;
  address: string;
  city: string;
  county: string;
  level: string;
  size: number;
  price: number;
  roomCount: string;
  realtyType: string;
  purpose: string;
  images = [];
  photos: File[] = [];

  alertMessage: string;
  alertClosed = true;
  isChecked = true;

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    if (!this.check()) {
      return;
    }

    const userRole = this.authService.currentUserRole();
    const data = {
      description: this.description,
      address: this.address,
      city: this.city,
      county: this.county,
      level: this.level,
      size: this.size,
      price: this.price,
      roomCount: this.roomCount,
      type: this.realtyType,
      purpose: this.purpose,
      owner: (userRole === 'basic' ? this.authService.currentUser() : this.authService.currentUser().agency),
      ownerType: (userRole === 'basic' ? 'user' : 'agency')
    };

    this.httpService.post('realties', data).subscribe(
      (realty: Realty) => {
      if (realty) {
        this.postImages(realty);
        this.router.navigate(['home']);
      } else {
        this.printError();
      }
    }, (err) => {
      this.printError();
    });
  }

  postImages(realty: Realty): void {
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    for (const image of this.photos) {
      const formData = new FormData();
      formData.append('photo', image);
      this.httpService.post(`realty/${realty.id}/photos`, formData, headers).subscribe((photo: Photo) => {
        if (!photo) {
          this.printError();
        }
      }, (err) => {
        this.printError();
      });
    }
  }

  check(): boolean {
    if (this.images.length < 3) {
      this.printError('Morate imati bar 3 slike');
      return false;
    }
    return true;
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (onLoadEvent: any) => {
          this.images.push(onLoadEvent.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
        this.photos.push(event.target.files[i]);
      }
    }
  }

  printError(message: string = null): void {
    this.alertMessage = message || 'Doslo je do greske';
    this.alertClosed = false;
  }

}
