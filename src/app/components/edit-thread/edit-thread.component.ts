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

  ngOnInit():void{
    this.editThreads();
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService
  ){}

  editThreads(){
    this.editThreadForm = this.fb.group({
      thread_name: [null, Validators.required],
      img_src: [null, [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      thread_id: [this.thread_id, Validators.required]
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
