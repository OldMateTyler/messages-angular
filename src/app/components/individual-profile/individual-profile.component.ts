import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'services/UserService';

@Component({
  selector: 'app-individual-profile',
  templateUrl: './individual-profile.component.html',
  styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent {
  Messages: any = [];
  routeSub: any;
  userID:Number | undefined;
  Profile :any;
  Relationship: any;
  Thread: any;
  currentUserID: any;
  checkerID: any;
  threadID : any;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
    ){}

    ngOnInit():void{
      this.loadUser();
      this.checkRelationship();
      this.getCurrentUserDetails();
    }
    checkRelationship(){
      var userID = null;

      this.routeSub = this.route.params.subscribe(params=>{
        userID = params['id']
      });
      return this.userService.CheckRelationship(userID).subscribe((data:any)=>{
        if(data[0].length != 0){
          this.Relationship = true;
          this.Thread = data[0][0].id;
        }
        else{
          this.Relationship = false;
        }
      })

    }
    getCurrentUserDetails(){
      return this.userService.GetCurrentUser().subscribe((response:any)=>{
        this.currentUserID = response[0].id;
      })
    }
    loadUser(){
      var userID = null;

      this.routeSub = this.route.params.subscribe(params=>{
        userID = params['id'];
        this.checkerID = params['id'];
      });
      
      return this.userService.GetUserProfile(userID).subscribe((data:any)=>{
        this.Profile = (Object.values(data)).flat(2);
      })
    }
}
