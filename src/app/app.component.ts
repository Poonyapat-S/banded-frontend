import { Component } from '@angular/core';
import { TokenService } from './service/auth/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  constructor(private tokenService: TokenService) {}

  updateLogInStatus(): void {
    if(this.tokenService.getUser() == 'auth-user' || this.tokenService.getUser() == null) {
      this.isLoggedIn = false;
    }
    else this.isLoggedIn = true;
  }

}
