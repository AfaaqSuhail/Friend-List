import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../common/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  signIn: FormGroup;
  responseMessage: any;
  constructor(private userService: UserService, private cookieService: CookieService,
    private router: Router, ) { }
  ngOnInit() {
    this.signIn = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  login() {
    this.userService.login(this.signIn.value).subscribe((res: any) => {
      console.log(res)
      this.router.navigate(['profile'])
    }, (error) => {
      this.responseMessage = error.error.message
      setTimeout(()=>{
        this.responseMessage = '';
      },3000)
    })
  }

}

