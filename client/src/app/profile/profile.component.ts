import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  users:any;
  friends:any;
  constructor(private userService: UserService,
    private router: Router, ) { }

  ngOnInit() {
    this.getProfile();
   
  }

  getProfile(){
    this.userService.getProfile().subscribe((res:any)=>{
      if(res.users.length){
        this.users = res.users
      }
    })
  }

  addFriend(userId:any){
    this.userService.addFriend(userId).subscribe((res:any)=>{
      this.friends = res.friends;
    })

  }

}
