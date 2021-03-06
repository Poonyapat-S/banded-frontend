import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class Profile{
  constructor(
    public userID:number,
    public name:string,
    public userName:string,
    public email:string,
    public bio: string,
    public favBand: string,
    public favSong: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient:HttpClient) { }
  public getProfile() {
    return this.httpClient.get<Profile>(environment.API_URL+"/profile").pipe(delay(500));
  }

  public getUserProfile(userName: string) {
    return this.httpClient.get<Profile>(environment.API_URL+"/profile/"+userName).pipe(delay(500));
  }

  public editBio(userName:string, text: string) {
    console.log(environment.API_URL+"/profile/editbio/"+userName);
    console.log(text);
    return this.httpClient.put<any>(environment.API_URL+"/profile/editbio/"+userName, text);
  }

  public deleteProfile(userName: string) {
    return this.httpClient.delete<any>(environment.API_URL+"/profile/delete/"+userName);
  }

  public followUser(userName: string) {
    return this.httpClient.post(environment.API_URL+"/api/followcontrol/followuser", userName);
  }

  public unfollowUser(userName: string) {
    return this.httpClient.post(environment.API_URL+"/api/followcontrol/unfollowuser", userName);
  }

  public getFollowedUserNames() {
    return this.httpClient.get<String[]>(environment.API_URL+"/api/followcontrol/getfollowedusers");
  }

  public blockUser(userName: string) {
    return this.httpClient.post(environment.API_URL+"/api/blockcontrol/blockuser", userName);
  }

  public unblockUser(userName: string) {
    return this.httpClient.post(environment.API_URL+"/api/blockcontrol/unblockuser", userName);
  }

  public setProfilePicture(sel: number) {
    return this.httpClient.post(environment.API_URL+"/api/user/setprofpic", sel);
  }

  public getProfilePicture() {
    return this.httpClient.get<string>(environment.API_URL+"/api/user/getprofpic");
  }

  public changeEmail(newEmail: string) {
    return this.httpClient.post<string>(environment.API_URL+"/profile/changeEmail", newEmail);
  }

  public changePassword(newPassword: string) {
    return this.httpClient.post<string>(environment.API_URL+"/profile/changePassword", newPassword);
  }
}
