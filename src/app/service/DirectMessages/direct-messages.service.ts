import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/class/conversation';
import { environment } from 'src/environments/environment';

export class newDMRequest{
  constructor(public otherUserName:string,
    public messageText: string) {}
}

@Injectable({
  providedIn: 'root'
})

export class DirectMessagesService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  public fetchConversations(): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(environment.API_URL+"/api/dms/conversations")
  }

  public fetchdms(userID: number): Observable<Conversation> {
    return this.httpClient.get<Conversation>(environment.API_URL+"/api/dms/message/"+userID)
  }

  public sendMessage(newRequest: newDMRequest) {
    return this.httpClient.post(environment.API_URL+"/api/dms/send", newRequest);
  }
}
