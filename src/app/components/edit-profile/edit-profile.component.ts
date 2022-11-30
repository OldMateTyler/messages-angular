import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'services/UserService';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  editProfileForm!: FormGroup;
  userName: any;
  userID: any;
  userImg: any;
  email: any;
  submitted: any;
  routeSub: any;

  ngOnInit():void{
    this.getCurrentUser();
    this.ProfileData();
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService){
      this.userService.GetCurrentUser().subscribe((res)=>{
        this.userID = res[0].id;
        this.userName = res[0].name;
        this.userImg = res[0].user_img;
      });
    }

  getCurrentUser(){
    var messageID = null;

    this.routeSub = this.route.params.subscribe((params: { [x: string]: any; })=>{
      messageID = params['id']
    });

      this.userService.GetCurrentUser().subscribe((res)=>{
      this.userID = res[0].id;
      this.userName = res[0].name;
      this.email = res[0].email;
      if(this.userID != messageID){
        this.ngZone.run(()=> this.router.navigateByUrl('/messages'));
      }
    });
  }
  ProfileData(){
    this.editProfileForm = this.fb.group({
      name: [null, Validators.required],
      user_img: [null, [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      id: [null,[Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
  }
  submitForm(){
    this.submitted = true;
    if(this.editProfileForm.get('user_img').value == null){
      this.editProfileForm.get('user_img').setValue(this.userImg);
    }
    if(this.editProfileForm.get('name').value == null){
      this.editProfileForm.get('name').setValue(this.userName);
    }
    if(this.editProfileForm.get('email').value == null){
      this.editProfileForm.get('email').setValue(this.email);
    }
    this.editProfileForm.get('id').setValue(this.userID);
    if(this.editProfileForm.valid){
      this.userService.UpdateProfile(this.editProfileForm.value).subscribe((res) =>{
        this.ngZone.run(()=> this.router.navigateByUrl('/messages'));
      });
    }

  }
}
