import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { data } from 'src/data/mock-heroes';
import { Superheroe } from 'src/models/Superheroe.model';

@Injectable({
  providedIn: 'root',
})
export class SuperHerosService {
  private heroes: Superheroe[];
  private heroes$: BehaviorSubject<Superheroe[]>;

  constructor() {
    this.heroes = data;
    this.heroes$ = new BehaviorSubject(this.heroes);
  }

  getHeroes$(): Observable<Superheroe[]> {
    return this.heroes$.asObservable();
  }

  getHeroes() {
    return this.heroes;
  }

  createHeroe(newHero: Superheroe) {
    newHero.id = new Date().getUTCMilliseconds();
    this.heroes.push(newHero);
  }

  modifyHeroeById(editedHeroe: Superheroe) {
    this.heroes = this.heroes.map((h) =>
      h.id !== editedHeroe.id ? h : editedHeroe
    );
    this.heroes$.next(this.heroes);
  }

  getHeroeById(id: number) {
    return this.heroes.find((h) => h.id === id) || null;
  }

  deleteHeroeById(heroe: Superheroe) {
    let index = this.heroes.indexOf(heroe);
    if (index > -1) {
      this.heroes.splice(index, 1);
    }

    this.heroes$.next(this.heroes);
  }

  searchByString(name: string) {
    let heroe = this.heroes.filter(
      (h) =>
        h.name.toLowerCase().includes(name.toLowerCase()) ||
        h.realName.toLowerCase().includes(name.toLowerCase())
    );
    this.heroes$.next(heroe);
  }
}
