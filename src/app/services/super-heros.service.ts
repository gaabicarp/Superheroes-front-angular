import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Superheroe } from 'src/models/Superheroe.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class SuperHerosService {

  private heroes!: Superheroe[];
  private dataUrl = 'assets/data/mock-heroes.json'

  constructor(
    private http: HttpClient
  ) {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.http.get<Superheroe[]>(this.dataUrl)
      .pipe(tap(superHeroes => { 
        console.log(superHeroes)
        this.heroes = superHeroes 
      }))
      .subscribe();
  }

  getHeroes(): Observable<Superheroe[]> {
    return new Observable(observer => {
      observer.next(this.heroes);
      observer.complete();
    })
  }

  editHeroe(updatedHero: Superheroe){
    const index = this.heroes.findIndex(i => i.id === updatedHero.id);
    if(index !== -1){
      this.heroes[index] = updatedHero;
    }
  }

  getHeroById(id: number){
    return this.heroes.find(i => i.id === id);
  }

  createHeroe(newHero: Superheroe) {
    newHero.id = new Date().getUTCMilliseconds();
    this.heroes.push(newHero);
  }

  getHeroeById(id: number) {
    return this.heroes.find((h) => h.id === id) || null;
  }

  deleteHeroeById(heroe: Superheroe) {
    let index = this.heroes.indexOf(heroe);
    if (index > -1) {
      this.heroes.splice(index, 1);
    }
  }

  searchByString(name: string) {
    return this.heroes.filter(
      (h) =>
        h.name.toLowerCase().includes(name.toLowerCase()) ||
        h.realName.toLowerCase().includes(name.toLowerCase())
    );
  }
}
