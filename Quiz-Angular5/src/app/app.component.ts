import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  name = 'Candidate Name';
  email = 'Candidate Email';
  
  constructor(private router : Router) { }
  
  register(e){
    console.log('register button clicked');
    e.preventDefault();
    this.router.navigate(['questions']);
    
  }
}
