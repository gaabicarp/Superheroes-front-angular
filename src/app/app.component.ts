import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Superheroe } from 'src/models/Superheroe.model';
import { LoadingService } from './services/loading.service';
import { SuperHerosService } from './services/super-heros.service';

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
