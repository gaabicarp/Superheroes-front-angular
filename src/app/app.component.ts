import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Superheroe } from 'src/models/Superheroe.model';
import { data } from 'src/data/mock-heroes';
import { SuperHerosService } from './services/super-heros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  heroes: Superheroe[] = [];
  showCreateEdit: Boolean = false;

  selectedHero: Superheroe | null = null;

  constructor(private superHeroService: SuperHerosService) {}

  ngOnInit(): void {
    this.superHeroService.getHeroes$().subscribe((res) => {
      this.refreshHeroes(res);
    });
  }

  refreshHeroes(heroes: Superheroe[]) {
    this.heroes = [];
    this.heroes.push(...heroes);
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
    this.superHeroService.modifyHeroeById(e);
    this.showHomePage();
  }

  deleteHeroe(e: any) {
    this.superHeroService.deleteHeroeById(e);
  }

  searchHeroe(e: string) {
    this.superHeroService.searchByString(e);
  }
}
