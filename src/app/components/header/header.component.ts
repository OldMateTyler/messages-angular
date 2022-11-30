import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'services/UserService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userID: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
    ){
      this.getCurrentUserDetails();
    }
    get SignedIn(){return localStorage.getItem('token');}
    getCurrentUserDetails(){
      return this.userService.GetCurrentUser().subscribe((response:any)=>{
        this.userID = response[0].id;
      })
    }
    SignUserOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/signin');
  }
}
