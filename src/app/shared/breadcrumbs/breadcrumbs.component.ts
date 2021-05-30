import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public title: string;
  public titleSub$: Subscription;

  constructor( private router: Router ) { 
    this.titleSub$ = this.getRouteData().subscribe( data => {
      this.title = data;
      document.title = data;
    });
  }

  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  getRouteData(){

    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event:ActivationEnd) =>  event.snapshot.data.title)
    );

  }



}
