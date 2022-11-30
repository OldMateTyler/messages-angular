import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted = false;
  userID:Number | undefined;
  CurrentThreadName :any;
  CurrentThreadImage : any;
  CurrentOtherUserImage : any;
  CurrentOtherUserID: any;
  CurrentThreadID: any;
  sendMessage!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private ngZone: NgZone,
    public fb: FormBuilder,
    ){}

    ngOnInit():void{
      this.loadMessages();
      this.getCurrentUserDetails();
      this.getCurrentThread();
      this.SendMessage();
    }
    getCurrentUserDetails(){
      return this.userService.GetCurrentUser().subscribe((response:any)=>{
        this.userID = response[0].id;
      })
    }
    getCurrentThread(){
      var messageID = null;

      this.routeSub = this.route.params.subscribe(params=>{
        this.CurrentThreadID = params['id'];
        messageID = params['id'];
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

    SendMessage(){
      var messageID = null;

      this.routeSub = this.route.params.subscribe(params=>{
        messageID = params['id']
      });
      this.sendMessage = this.fb.group({
        body: [null, Validators.required],
        author: [null, Validators.required],
        recipient: [null, Validators.required],
        thread_id: [messageID, Validators.required],
      });
    }

    deleteMessage(message_id){
      this.userService.DeleteMessage(message_id).subscribe((res)=>{
        this.loadMessages();
      });
    }

    submitForm(){

      this.sendMessage.get('recipient').setValue(this.CurrentOtherUserID);
      this.sendMessage.get('author').setValue(this.userID);

      this.submitted = true;
      if(this.sendMessage.valid){
        this.userService.SendMessage(this.sendMessage.value).subscribe((res) =>{
          this.sendMessage.get('body').reset();
          this.loadMessages();
        })
      }
    }
}
