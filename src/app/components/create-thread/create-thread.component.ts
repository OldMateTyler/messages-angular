import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'services/UserService';

@Component({
  selector: 'app-create-thread',
  templateUrl: './create-thread.component.html',
  styleUrls: ['./create-thread.component.scss']
})
export class CreateThreadComponent {
  createThreadForm!: FormGroup;
  submitted = false;
  otherUsers = [];
  userID: any;

  ngOnInit():void{
    this.getCurrentUserDetails()
    this.createThreadForms();
    this.getUsers();

  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public userService: UserService,
  ){}
  getUsers(){
    this.userService.GetOtherUsers().subscribe((res)=>{
      this.otherUsers = (Object.values(res)).flat(2);
    })
  }
  getCurrentUserDetails(){
    return this.userService.GetCurrentUser().subscribe((response:any)=>{
      this.userID = response[0].id;
    })
  }
  createThreadForms(){
    this.createThreadForm = this.fb.group({
      thread_name: [null, Validators.required],
      userTwo:[null, Validators.required],
      img_src: [null, [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
    });
  }

  get thread_name(){return this.createThreadForm.get('thread_name');}
  get userTwo(){return this.createThreadForm.get('userTwo');}
  get img_src(){return this.createThreadForm.get('img_src');}

  submitForm(){
    this.submitted = true;
    if(this.createThreadForm.valid){
      this.userService.CreateThread(this.createThreadForm.value).subscribe((res) =>{
        this.ngZone.run(()=> this.router.navigateByUrl('/messages'));
      })
    }
  }

}
