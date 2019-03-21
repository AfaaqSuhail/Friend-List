import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit {

  user:any
  friends:any;
  currentUser:any;
  message:any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.message =''
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.getFriends();
  }

  getFriends(){
    this.userService.getFriends().subscribe((res:any)=>{
     if(res.users.length){
      this.friends = res.users
     }
     else{
       this.message = 'There are no friends.'
     }
    })
  }
}
