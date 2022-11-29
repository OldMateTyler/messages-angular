import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'services/UserService';

@Component({
  selector: 'app-individual-message',
  templateUrl: './individual-message.component.html',
  styleUrls: ['./individual-message.component.scss']
})
export class IndividualMessageComponent {
  Messages: any = [];
  routeSub: any;
  userID:Number | undefined;
  CurrentThreadName :any;
  CurrentThreadImage : any;
  CurrentOtherUserImage : any;
  CurrentOtherUserID: any;
  CurrentThreadID: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
    ){}

    ngOnInit():void{
      this.loadMessages();
      this.getCurrentUserDetails();
      this.getCurrentThread();

      this.routeSub = this.route.params.subscribe(params=>{
        this.CurrentThreadID = params['id']
      });
    }
    getCurrentUserDetails(){
      return this.userService.GetCurrentUser().subscribe((response:any)=>{
        this.userID = response[0].id;
      })
    }
    getCurrentThread(){
      var messageID = null;

      this.routeSub = this.route.params.subscribe(params=>{
        messageID = params['id']
      });
      return this.userService.GetCurrentThread(messageID).subscribe((response:any)=>{
        this.CurrentThreadName = response[0].thread_name;
        this.CurrentThreadImage = response[0].img_src;
        this.CurrentOtherUserImage = response[0].user_img;
        this.CurrentOtherUserID = response[0].users_id;
      });
    }
    loadMessages(){
      var messageID = null;

      this.routeSub = this.route.params.subscribe(params=>{
        messageID = params['id']
      });

      return this.userService.GetUsersMessages(messageID).subscribe((data : any)=>{
        this.Messages = (Object.values(data)).flat(2);
      })
    }
}
