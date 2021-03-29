import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor() {
   }

  links:linkItem[]=[];



  ngOnInit() {
    this.links.push(new linkItem("Cases","#"));
    
    this.links.push(new linkItem("Create","#"));
    
    this.links.push(new linkItem("Admin","user"));

 
    
  }

 

}

class linkItem{
  link:String;
  linkName:String;

  constructor(linkName:String,link:String){
    this.link=link;
    this.linkName=linkName;
  }

}
