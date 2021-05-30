import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url:'/' },
        { title: 'Graphics', url:'/dashboard/graphic1' },
        { title: 'ProgressBar', url:'/dashboard/progress' },
        { title: 'Promises', url:'/dashboard/promises' },
        { title: 'Rxjs', url:'/dashboard/rxjs' },
      ]
    }
  ]

}
