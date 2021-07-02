import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterForm } from '../../../interfaces/registerForm.interface';
import { LoginForm } from '../../../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi: any;

const url = environment.baseUrlUser;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) { 

                this.googleInit();

  }

  googleInit(){

    return new Promise<void>(resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '859082290984-1ahmguccov7rskjro8l0ek4nsantb3nv.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });

    })

  }

  logOut(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      })
    });
    this.auth2.disconnect();
  }

  validateToken():Observable<boolean>{

    const token = localStorage.getItem('token') || '';

    return this.http.get( `${url}/login/renew`, { 
      headers: { 'x-token': token }
     })
     .pipe(
       tap( (resp: any) =>{
        localStorage.setItem('token', resp.token);
       }),
       map(resp => true),
       catchError(error => of(false))
     )

  }

  createUser( form: RegisterForm ){

    return this.http.post( `${url}/users`, form )
                .pipe(
                  tap( (resp: any) =>{
                    localStorage.setItem('token', resp.token);
                  })
                );

  }

  loginUser( form: LoginForm ){

    return this.http.post( `${url}/login`, form )
                      .pipe(
                        tap( (resp: any) =>{
                          localStorage.setItem('token', resp.token);
                        })
                      );

  }

  loginGoogle( token: any ){

    return this.http.post( `${url}/login/google`, {token} )
                      .pipe(
                        tap( (resp: any) =>{
                          localStorage.setItem('token', resp.token);
                        })
                      );

  }

}
