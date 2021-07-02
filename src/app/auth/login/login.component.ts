import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public auth2: any;

  public loginForm = this.fb.group({
    email:[localStorage.getItem('email'), [Validators.required, Validators.email]], //'arnoldo3@gmail.com'
    password:[, [Validators.required, Validators.minLength(6)]],
    remember:[true,[Validators.required]]
  }); 

  constructor( private router: Router,
               private fb: FormBuilder,
               private userService: UserService,
               private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);

    this.userService.loginUser(this.loginForm.value)
          .subscribe( resp => {

            if( this.loginForm.get('remember').value ){
              localStorage.setItem('email', this.loginForm.get('email').value);
            }else{
              localStorage.removeItem('email');
            }

            this.router.navigateByUrl('/');
          }, (err) => {
            console.log(err);
            Swal.fire('Error', err.error.msg, 'error');
          });

    // this.router.navigateByUrl('/');
  }
  
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp(){
    
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
    
  }

    attachSignin(element) {
      
      this.auth2.attachClickHandler(element, {},
          (googleUser) => {
            var id_token = googleUser.getAuthResponse().id_token;
            
            this.userService.loginGoogle(id_token).subscribe(
              resp => { 
                this.ngZone.run(()=>{
                  this.router.navigateByUrl('/')
                }) 
              }
            );
            

          }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
          });
    }
  


}
