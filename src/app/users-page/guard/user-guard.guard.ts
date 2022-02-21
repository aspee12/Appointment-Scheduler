import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserGaurdGuard implements CanActivate {
  constructor(private route: Router) {}
  canActivate() {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    } else {
      this.route.navigateByUrl('/');
      return false;
    }
  }
}
