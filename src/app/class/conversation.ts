import { formatDate } from "@angular/common";
import { Profile } from "../service/profile/profile.service";
import { Message } from "./message";

export class Conversation {
  constructor(
    public currUser: Profile,
    public otherUser: Profile,
    public dms:Message[],
    public latestMessageTime:string,
  ) {latestMessageTime = formatDate(latestMessageTime, 'yyyy/MM/dd hh:mm a', "en-US");}


}
