import { Component, OnInit } from '@angular/core';
import { AuthenticationService, Credentials } from '../service/auth/authentication.service';
import { TokenService } from '../service/auth/token.service';
import { Router } from '@angular/router';
import { windowWhen } from 'rxjs';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  public credentials: Credentials = new Credentials("", "");
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  failedAttempts = 0;
  showLoginBtn = true;

  constructor(private router: Router, private auth: AuthenticationService, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.auth.login(this.credentials).subscribe({next: (data) => {this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(data);
        console.log(data)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenService.getUser().roles;
        this.submitted = true;
        alert("Login Successful");
        this.router.navigate(['profile'])},
      error: async (err) => {
        console.log(err.status);
        console.log(err);
        this.errorMessage = err.error;
        this.submitted = true;
        this.isLoginFailed = true;
        this.failedAttempts+=1;
        if(this.failedAttempts > 5){
          alert("To many failed attempts please wait 60 seconds!");
          this.showLoginBtn = false;
          this.errorMessage = "Timed out!!"
          await new Promise(resolve => setTimeout(resolve, 60000)); // 60 sec
          // this.failedAttempts = 0;
          this.showLoginBtn = true;
          this.reloadPage();
        }
      }})

  };

  reloadPage(): void {
    window.location.reload();
  }

}
