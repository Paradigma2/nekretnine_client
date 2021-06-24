import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'client';
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  currentUser(): User {
    return this.authService.currentUser();
  }

  authenticated(): boolean {
    return this.authService.authenticated();
  }

  currentUserRole(): string {
    return this.authService.currentUserRole();
  }

  signOut(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
