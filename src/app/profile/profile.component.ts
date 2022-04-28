import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, ProfileService } from '../service/profile/profile.service';
import { TokenService } from '../service/auth/token.service';
import { Router } from '@angular/router';
import { DirectMessagesService, newDMRequest } from '../service/DirectMessages/direct-messages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currProfile: Profile;
  public editBioText: string;
  public currUserName: string;
  public viewingUserName: string;

  constructor(private profileService: ProfileService, private tokenService: TokenService, private router: Router, private route: ActivatedRoute, private dmService: DirectMessagesService) {
    console.log(this.tokenService.getUser());
    this.viewingUserName="";
    this.currProfile = new Profile(0, "", "", "", "", "", "");
    this.editBioText = "";
    this.currUserName = this.tokenService.getUser().username;
    this.route.params.subscribe(params => {
      if(params['userName']) {
        this.viewingUserName=params['userName'];
        this.profileService.getUserProfile(params['userName']).subscribe({next: data=>this.currProfile=data, error: err=>alert("Not Found")});
      }
      else {
        this.viewingUserName=this.currUserName;
        this.profileService.getProfile().subscribe({next: data=>this.currProfile=data, error: err=>alert("Not Found")});
      }
    })
  }

  ngOnInit() {

  }

  public async loadProfile(): Promise<any> {
    this.profileService.getProfile().subscribe((data: Profile) => {
      console.log(data);
      this.currProfile = data
    });
  }
  public editProfile() {
    this.profileService.editBio(this.currProfile.userName, this.editBioText).subscribe({next: response => window.location.reload(), error: err => alert("Unauthorized")});
    // window.location.reload();
  }

  public deleteProfile() {
    this.profileService.deleteProfile(this.currProfile.userName).subscribe({next: response => {alert("Profile Deleted"); this.tokenService.signOut(); this.router.navigate(['']);}, error: err => alert("Unauthorized")});
  }

  @HostListener('window:follow')
  public followUser() {
    this.profileService.followUser(this.viewingUserName).subscribe({next: response => alert("Followed "+this.viewingUserName+"!"), error: err => console.log(err)});
  }

  @HostListener('window:unfollow')
  public unfollowUser() {
    this.profileService.unfollowUser(this.viewingUserName).subscribe({next: response => alert("Unfollowed "+this.viewingUserName+"!"), error: err => console.log(err)});
  }
  @HostListener('window:sendMessage', ['$event.detail'])
  sendMessage(detail: any) {
    var newRequest = new newDMRequest(this.currProfile.userName, detail.messageText);
    console.log(detail.messageText);
    this.dmService.sendMessage(newRequest).subscribe(data => console.log(data));
  }


  @HostListener('window:block')
  public blockUser() {
    this.profileService.blockUser(this.viewingUserName).subscribe({next: response => alert("Blocked "+this.viewingUserName+"!"), error: err => console.log(err)});
  }

  @HostListener('window:unblock')
  public unblockUser() {
    this.profileService.unblockUser(this.viewingUserName).subscribe({next: response => alert("Unblocked "+this.viewingUserName+"!"), error: err => console.log(err)});
  }

}
