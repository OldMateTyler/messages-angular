import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'services/UserService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Threads: any = [];
  userID:Number | undefined;
  constructor(public userService: UserService , private ngZone: NgZone, private router: Router){}
  
  get usersID(){return this.userID;}

  ngOnInit():void{
    this.getCurrentUserDetails();
    this.loadThreads();
    }
  getCurrentUserDetails(){
    return this.userService.GetCurrentUser().subscribe((response:any)=>{
      this.userID = response[0].id;
    })
  }
  DeleteUsersThread(thread_id){
    this.userService.DeleteThread(thread_id).subscribe((response:any)=>{});
    this.loadThreads();
  }
  loadThreads(){
    return this.userService.GetThreads().subscribe((response:{})=>{
        this.Threads = (Object.values(response)).flat(2);
        console.log(this.Threads);
    })
  }
}
