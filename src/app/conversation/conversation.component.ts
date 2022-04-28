import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile, ProfileService } from '../service/profile/profile.service';
import { PostService } from '../service/post/post.service';
import { DirectMessagesService, newDMRequest } from '../service/DirectMessages/direct-messages.service';
import { Conversation } from '../class/conversation';
import { delay } from 'rxjs';
import { TokenService } from '../service/auth/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class conversationComponent implements OnInit {

  public conversation: any;
  constructor(private router: Router, private tokenService: TokenService, private dmService: DirectMessagesService, private route:ActivatedRoute) {this.route.params.subscribe(params => this.loadDms(params["otherUserID"]));}

  ngOnInit(): void {
    if(this.tokenService.getUser()) {
      
    } else {
      alert("Please sign in first!");
      this.router.navigate(['/login']);
    }
  }

  loadDms(otherUserID: number): void {
    this.dmService.fetchdms(otherUserID).subscribe({next: data => {
      this.conversation = data;
      console.log(this.conversation);
    }, error: err => alert(err)})
  }

  @HostListener('window:sendMessage', ['$event.detail'])
  sendMessage(detail: any) {
    var newRequest = new newDMRequest(this.conversation.otherUser.userName, detail.messageText);
    console.log(detail.messageText);
    this.dmService.sendMessage(newRequest).subscribe(data => console.log(data));
  }

}
