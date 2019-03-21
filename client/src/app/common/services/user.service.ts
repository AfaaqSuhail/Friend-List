import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any = {};

  constructor(private http: HttpClient, private cookieService: CookieService) {
   }

   getUser(){
     return this.http.get(`me`,{
       withCredentials: true
     })
   }

  signUp(userCredentials:any){
    return this.http.post(`signup`,userCredentials,{
      withCredentials: true
    })
  }

  login(userCredentials:any){
    return this.http.post(`login`,userCredentials, {
      withCredentials: true
    })
  }
  
  getProfile(){
    return this.http.get(`profile`,{
      withCredentials: true
    })
  }

  addFriend(friendId:any,userId:any){
    return this.http.post(`friends/${friendId}`,{
      userId: userId,
      withCredentials: true,
    })
  }

  getFriends(){
   return this.http.get(`friends`,{
     withCredentials: true
   })
  }
  
  logout(){
    localStorage.removeItem('user')
    return this.http.get(`logout`,{
      withCredentials: true
    })
  }
}

