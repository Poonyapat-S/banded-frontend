import { formatDate } from "@angular/common";

export class Message {
  constructor(
    public senderID: number,
    public recipientID: number,
    public messageText:string,
    public timeSent:string,
  ) {timeSent = formatDate(timeSent, 'yyyy/MM/dd hh:mm a', "en-US");}
}
