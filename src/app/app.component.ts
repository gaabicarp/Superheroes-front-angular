import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Superheroe } from 'src/models/Superheroe.model';
import { SuperHerosService } from './services/super-heros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  heroes: Superheroe[] = [];
  searchResults: Superheroe[] = []; 
  showCreateEdit: Boolean = false;
  selectedHero: Superheroe | null = null;

  constructor(
    private superHeroService: SuperHerosService
  ) {}

  ngOnInit(): void {
    this.superHeroService.getHeroes().subscribe((res) => {
      this.heroes = res;
      this.searchResults = res;
      console.log(this.heroes)
      console.log(this.searchResults)
    });
  }

  refreshHeroes(heroes: Superheroe[]) {
  }

  showEditHeroePage(e: Superheroe) {
    this.selectedHero = e;
    this.showCreateEdit = true;
  }

  showNewHeroePage() {
    this.selectedHero = null;
    this.showCreateEdit = true;
  }

  showHomePage(): void {
    this.showCreateEdit = false;
  }

  createHeroe(e: any) {
    this.superHeroService.createHeroe(e);
    this.showHomePage();
  }

  editHeroe(e: any) {
    this.superHeroService.editHeroe(e);
    this.showHomePage();
  }

  deleteHeroe(e: any) {
    this.superHeroService.deleteHeroeById(e);
  }

  searchHeroe(e: string) {
    if(e === ''){
      this.searchResults = this.heroes;
    } else {
      this.searchResults = this.superHeroService.searchByString(e);
    }
  }
}
