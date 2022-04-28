import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/auth/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isLoggedIn: boolean = false;
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigate(["/"]);
    alert("User Logged Out.");
    location.reload();
  }

}
