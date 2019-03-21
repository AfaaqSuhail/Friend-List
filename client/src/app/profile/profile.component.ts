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

  users: any;
  currentUser: any;
  friends: any;
  friendIds: any = [];
  message: any;
  constructor(private userService: UserService,
    private router: Router, ) { }

  ngOnInit() {
    this.message = '';
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe((res: any) => {
      if (res.users.length) {
        this.users = res.users;
        this.isFriend();
      }
      else {
        this.message = 'There are no users except you.'
      }
    })
  }

  addFriend(friendId: any) {
    this.userService.addFriend(friendId, this.currentUser._id).subscribe((res: any) => {
      this.router.navigate(['friends'])
    })
  }

  isFriend() {
    this.users.forEach((element) => {
      this.currentUser.friends.forEach((elem) => {
        if (elem == element._id) {
          element.hideButton = true;
        }
      });
    });
  }

}
