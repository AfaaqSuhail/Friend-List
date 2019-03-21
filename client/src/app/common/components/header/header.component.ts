import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUser().subscribe((res:any)=>{
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  logout(){
    this.userService.logout().subscribe((res:any)=>{
      this.router.navigate(['/'])
    })
  }


}
