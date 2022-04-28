import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Post } from '../class/post';
import { TokenService } from '../service/auth/token.service';
import { PostService } from '../service/post/post.service';
import { Profile, ProfileService } from '../service/profile/profile.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './commentViewer.component.html',
  styleUrls: ['./commentViewer.component.css']
})
export class commentViewerComponent implements OnInit {
  public currProfile: Profile;
  public currPost: Post;
  public comments: Post[];
  private count: number;

  constructor(private router: Router, private profileService: ProfileService, private postService: PostService, private route: ActivatedRoute,private tokenService: TokenService) {
    // Date date = new Date();
    this.currProfile = new Profile(0, "", "", "", "", "","");
    this.currPost = new Post("", "", "", "", "", "", false, new Date());
    this.comments=[];
    this.count=0;
  }

  ngOnInit() {
    var postID="";
    this.route.params.subscribe(params => postID=params["postID"]);
    this.postService.getPostFromId(postID).pipe(delay(500)).subscribe(data => {this.currPost=data});
    this.postService.get_post_comments(postID).pipe(delay(500)).subscribe((data: Post[]) => {this.comments=data; console.log(data);});
    this.profileService.getProfile().subscribe(data => this.currProfile=data);
    console.log(this.currProfile)
  }

  public async loadProfile(): Promise<any> {
    this.profileService.getProfile().subscribe((data: Profile) => {
      console.log(data);
      this.currProfile = data
    });
  }

  reloadPage(): void {
    // this.count++;
    window.location.reload();
  }


  public getPostService(): PostService {
    return this.postService;
  }

  convertDateTime(postTime: Date): string {
    // console.log(postTime);
    // postTime = new Date(postTime);
    // console.log(postTime);
    // return postTime.toISOString().slice(0, 10) + " " + postTime.toISOString().slice(11, 19)
    return formatDate(postTime, 'yyyy/MM/dd hh:mm a', "en-US");

  }

  checkProfile() {
    if(this.tokenService.getUser()) {
      return true;
    } else {
      return false;
    }
  }
}