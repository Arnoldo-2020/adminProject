import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  constructor() { 
    

    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe( 
    //                 resp => console.log(resp),
    //                 error => console.warn('Error',error),
    //                 () => console.info('Obs finished'))

    this.intervalSubs = this.returnInterval()
      .subscribe(console.log)

  }

  returnInterval(){

    return interval(500).pipe(
            map( value => value + 1),
            filter( value => (value % 2  === 0) ? true: false ),
            // take(4)
    )

  }

  returnObservable():Observable<number>{

    let i= -1;

    return new Observable<number>( observer => {

      const interval = setInterval(() => {

        i++;
        observer.next(i);

        if(i === 4){
          clearInterval(interval);
          observer.complete();
        }

        if(i === 2){
          observer.error('Error 12341432423');
        }

      },1000)

    });

  }

  ngOnInit(): void {
  }

}
