import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { data } from 'src/data/mock-heroes';
import { Superheroe } from 'src/models/Superheroe.model';

@Injectable({
  providedIn: 'root'
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

  getHeroes(){
    return this.heroes;
  }

  createHeroe(newHero: Superheroe){
    newHero.id = new Date().getUTCMilliseconds();
    this.heroes.push(newHero)
  }
}
