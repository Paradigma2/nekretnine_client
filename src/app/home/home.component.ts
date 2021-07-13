import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';
import { Realty } from '../models/realty.model';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string;
  priceFrom: string;
  priceTo: string;
  promoted: Realty[] = [];
  realties: Realty[] = [];

  constructor(private httpService: HttpService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.get('realties?promoted=true&status=registered').subscribe((promoted: Realty[]) => {
      for (const promo of promoted) {
        this.httpService.get(`realty/${promo.id}/photo`).subscribe((photo: Photo) => {
          promo.photo = photo.filename;
        });
        this.promoted.push(promo);
      }
    });
  }

  search(): void {

  }

  authenticated(): boolean {
    return this.authService.authenticated();
  }

}
