import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../common/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  responseMessage: any;
  constructor(private userService: UserService, private cookieService: CookieService,
    private router: Router, ) { }
  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl(''),
      name: new FormControl(''),
      password: new FormControl('')
    });
  }

  signUp() {
    this.userService.signUp(this.signUpForm.value).subscribe((res: any) => {
      this.router.navigate(['profile'])
    }, (error) => {
      this.responseMessage = error.error.message
      setTimeout(()=>{
        this.responseMessage = '';
      },3000)
    })
  }

}
