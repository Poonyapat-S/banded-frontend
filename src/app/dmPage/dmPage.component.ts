import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, ProfileService } from '../service/profile/profile.service';
import { Post } from '../class/post';
import { PostService } from '../service/post/post.service';
import { DirectMessagesService } from '../service/DirectMessages/direct-messages.service';
import { TokenService } from '../service/auth/token.service';
import { Conversation } from '../class/conversation';

@Component({
  selector: 'app-profile',
  templateUrl: './dmPage.component.html',
  styleUrls: ['./dmPage.component.css']
})
export class dmPageComponent implements OnInit {

  public currUsername:string
  public conversations: Conversation[]=[];

  constructor(private router: Router, private dmService: DirectMessagesService, private tokenService: TokenService) { this.currUsername=this.tokenService.getUser().username; }

  ngOnInit(): void {
    this.dmService.fetchConversations().subscribe({next: data => {console.log(data);this.conversations=data}, error: err=>console.log(err)});
  }

}
