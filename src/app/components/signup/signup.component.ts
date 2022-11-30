import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'services/UserService';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  submitted = false;

  ngOnInit():void{
    localStorage.removeItem('token');
    this.signUserIn();
  }
  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public userService: UserService,
  ){
  }

  signUserIn(){
    this.signUpForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required],
    });
  }
  get name(){return this.signUpForm.get('name');}
  get email(){return this.signUpForm.get('email');}
  get password(){return this.signUpForm.get('password');}

  submitForm(){
    this.submitted = true;
    if(this.signUpForm.valid){
      this.userService.SignUpUser(this.signUpForm.value).subscribe((res) =>{
        localStorage.setItem('token', res.token);
        this.ngZone.run(()=> this.router.navigateByUrl('/messages'));
      })
    }
  }
}
