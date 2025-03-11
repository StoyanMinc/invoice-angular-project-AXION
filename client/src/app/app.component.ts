import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SystemService } from './system.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(public system:SystemService,public router:Router, public http:HttpClient) {
    this.system.LoadHttpModule(http);
  }

  ReturnUrl() {
    return this.router.url.split('/').at(1);
  }

  ReturnIsUrlLike(like) {
    if(this.router.url.indexOf(like) > -1) { return true; } else { return false; }
  }
}
