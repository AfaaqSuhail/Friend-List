import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  users:any;
  currentUser:any;
  friends:any;
  friendIds:any = [];
  constructor(private userService: UserService,
    private router: Router, ) { }

  ngOnInit() {  
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.getProfile();
  }

  getProfile(){
    this.userService.getProfile().subscribe((res:any)=>{
      if(res.users.length){
        this.users = res.users;
        console.log("profile",this.users)
        console.log("currentUser",this.currentUser)
        this.isFriend();       
      }
    })
  }

  addFriend(friendId:any){
    this.userService.addFriend(friendId,this.currentUser._id).subscribe((res:any)=>{
      this.router.navigate(['friends'])
    })
  }

  isFriend(){
    if(this.currentUser.friends.length){
      this.currentUser.friends.forEach((friendId:any)=>{
        console.log(friendId)
        this.users.forEach((user:any)=>{
          if(user._id==friendId){
            user.showbutton = 'false'
          }
          else{
            user.showbutton = 'true'
          }
        })
      })
      console.log(this.users)
    }
    else{
      this.users.forEach((user:any)=>{
          user.showbutton = 'true'
      })
    }
  }
}
