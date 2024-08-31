import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  
  constructor(private route : Router){
  
  }
  title = 'aiitechsdb'
  logOutButton:any=null
  ngOnInit() {
    this.route.events
      .pipe(filter((event:any) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.displayLogOutButton();
      });
  }
 displayLogOutButton(){
  console.log(this.route.url)
  if(this.route.url==='/'){
    this.logOutButton=false
  }
  else {
    this.logOutButton=true
 }
 console.log('logOutButton : ',this.logOutButton)
} 

logOut(){
  sessionStorage.clear()
  this.route.navigate([''])

}
   
 


}
