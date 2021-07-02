import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    name: ['Arnoldo', Validators.required],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terms: [, Validators.required]
  }, {
    validators: this.equalPasswords('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private router: Router ) {  }

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm);
    console.log(this.registerForm.valid);

    this.userService.createUser(this.registerForm.value)
                        .subscribe( resp => {
                          console.log(resp);
                          this.router.navigateByUrl('/');
                        }, (err) => {
                          console.log(err);
                          Swal.fire('Error', err.error.msg, 'error');
                        });

  }

  formValidation(field: string):boolean{

    return this.registerForm.get(field).invalid && this.formSubmitted;

  }

  termsValidation():boolean{
    if((this.registerForm.get('terms').value == false || this.registerForm.get('terms').value == null) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  passwordValidation(){

    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if(pass1 != pass2){
      return true;
    }else{
      return false;
    }

  }

  equalPasswords(pass1: string, pass2: string){

    return ( formGroup: FormGroup ) =>{

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true });
      }

    }

  }

  

  


  

}
