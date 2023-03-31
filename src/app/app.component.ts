import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  load: boolean = false;

  constructor(
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.getLoading().subscribe(res=> this.load = res)
  }

}
