import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    protected readonly router: Router,
  ) { }

  ngOnInit() {
  }

  useUpdate(link?: string): void {
    if(link){
      this.router.navigate(['admin/core/' + link]);    
    }    
  }
}
