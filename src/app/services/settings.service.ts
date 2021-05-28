import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private link = document.querySelector('#theme');

  constructor() { 
    
    const localUrl = localStorage.getItem('theme');
    const url =  localUrl || `./assets/css/colors/default.css`;
    this.link.setAttribute('href', url);

  }

  changeTheme( theme: string ){

    const url = `./assets/css/colors/${theme}.css`;
    this.link?.setAttribute('href', url);
    
    localStorage.setItem('theme', url);
    this.checkTheme();
  }

  checkTheme(){

    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach( elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentUrl = this.link?.getAttribute('href');
      

      if(btnUrl === currentUrl){
        elem.classList.add('working');
      }
    })
    


  }

}
