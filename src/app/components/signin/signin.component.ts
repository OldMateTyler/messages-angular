import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'services/UserService';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  signInForm!: FormGroup;
  submitted = false;

  ngOnInit():void{
    localStorage.removeItem('token');
    this.signUserIn();
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public userService: UserService
  ){    
}

  signUserIn(){
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required],
    });
  }
  get email(){return this.signInForm.get('email');}
  get password(){return this.signInForm.get('password');}

  submitForm(){
    this.submitted = true;
    if(this.signInForm.valid){
      this.userService.SignInUser(this.signInForm.value).subscribe((res) =>{
        localStorage.setItem('token', res.token);
        this.ngZone.run(()=> this.router.navigateByUrl('/messages'));
      })
    }
  }
}
