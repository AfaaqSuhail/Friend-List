import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any = {};
  showLoader: boolean = true;
  cartMaterials: any = [];
  orderResponse: any = {};
  compareMaterials: any = [];
  cartProductCount: any;


  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.compareMaterials = (typeof localStorage.getItem('compareItems') != 'object') ? JSON.parse(localStorage.getItem('compareItems')) : []
   }

  //  getMe(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     if (Object.keys(this.user).length != 0) {
  //       resolve({ body: { user: this.user } })
  //       this.http.get('/users/me', {}).subscribe((res: any) => {
  //         Object.assign(this.user, res.body.user)
  //         this.cartMaterials =JSON.parse(localStorage.getItem('cart_item'))
  //       }, (error: any) => {
  //         reject(error);
  //       });
  //     } else {
  //       this.http.get('/users/me', {}).subscribe((res: any) => {
  //         Object.assign(this.user, res.body.user)
  //         this.cartMaterials =JSON.parse(localStorage.getItem('cart_item'))
  //         resolve(res);
  //       }, (error: any) => {
  //         reject(error.error);
  //       });
  //     }
  //   });
  // }

  getMe(){
    return this.http.get(`me`,{
      withCredentials: true
    })
  }

  signUp(userCredentials:any){
    return this.http.post(`signup`,userCredentials)
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

  addFriend(friendId:any){
    return this.http.post(`friends/${friendId}`,{
      withCredentials: true
    })

  }
  
  logout(){
    this.user = {};
    this.cookieService.delete('token');
  }
}

