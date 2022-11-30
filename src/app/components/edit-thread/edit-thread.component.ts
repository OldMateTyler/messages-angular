import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'services/UserService';

@Component({
  selector: 'app-edit-thread',
  templateUrl: './edit-thread.component.html',
  styleUrls: ['./edit-thread.component.scss']
})
export class EditThreadComponent {
  editThreadForm!: FormGroup;
  submitted = false;
  routeSub: any;
  userID:Number | undefined;
  CurrentThreadName :any;
  CurrentThreadImage : any;
  CurrentOtherUserImage : any;
  CurrentOtherUserID: any;
  CurrentThreadID: any;

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService
  ){}

  ngOnInit():void{
    this.getThisThread();
  }

  getThisThread(){
    var messageID = null;

    this.routeSub = this.route.params.subscribe(params=>{
      this.CurrentThreadID = params['id'];
      messageID = params['id'];
    });
    this.editThreadForm = this.fb.group({
      thread_name: [this.CurrentThreadName,Validators.required],
      img_src: [this.CurrentOtherUserImage,[Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      thread_id: [messageID,Validators.required]
    });

    this.userService.GetCurrentThread(messageID).subscribe((response:any)=>{
      this.CurrentThreadName = response[0].thread_name;
      this.CurrentThreadImage = response[0].img_src;
      this.CurrentOtherUserImage = response[0].user_img;
      this.CurrentOtherUserID = response[0].users_id;
      console.log(response);

      this.editThreadForm = this.fb.group({
        thread_name: [this.CurrentThreadName,Validators.required],
        img_src: [this.CurrentThreadImage,[Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
        thread_id: [messageID,Validators.required]
      });
    });
  }
  get thread_id(){
    var messageID = null;

    this.routeSub = this.route.params.subscribe((params: { [x: string]: any; })=>{
      messageID = params['id']
    });
    return messageID;
  }

  get name(){return this.editThreadForm.get('thread_name');}
  get img_src(){return this.editThreadForm.get('img_src');}

  submitForm(){
    this.submitted = true;
    if(this.editThreadForm.valid){
      this.userService.EditThreads(this.editThreadForm.value).subscribe((res) =>{
        this.ngZone.run(()=> this.router.navigateByUrl('/messages'));
      })
    }
  }
}
