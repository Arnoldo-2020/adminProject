import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers()
      .then( users => {
        console.log(users);
      })

    // const promise = new Promise( ( resolve, reject ) =>{

    //   if(false){
    //     resolve('Hello');
    //   }else(
    //     reject('Something went wrong')
    //   )

    // });

    // promise.then( (message) =>{
    //   console.log(message);
    // })
    // .catch( error => console.log('Error in the promise', error));

    // console.log('End of the init');

  }

  getUsers(){

    const promise = new Promise( resolve => {

      fetch('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then( body => resolve(body.data))

    });
    
    return promise;

  }

}
