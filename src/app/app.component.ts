import { Component, OnInit } from '@angular/core';
import { Superheroe } from 'src/models/Superheroe.model';
import { SuperHerosService } from './services/super-heros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  heroes: Superheroe[] = [];
  showCreateEdit: Boolean = false;

  selectedHero!: Superheroe;

  constructor(
    private superHeroService: SuperHerosService
  ){}

  ngOnInit(): void{
    this.superHeroService.getHeroes().subscribe(res => {
      this.heroes = res;
    })
  }

  showEditHeroePage(e: Superheroe){
    this.selectedHero = e;
    this.showCreateEdit = true;
  }

  showNewHeroePage(){
    console.log('asd')
  }

  showHomePage(): void{
    this.showCreateEdit = true;
  }

  createHeroe(e: any){
    this.superHeroService.createHeroe(e)
    this.showHomePage();
  }

  editHeroe(e: any){
    console.log(e)
  }
  
}
