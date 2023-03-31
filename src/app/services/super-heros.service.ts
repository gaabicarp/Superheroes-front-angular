import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Superheroe } from 'src/models/Superheroe.model';
import { find, map, shareReplay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class SuperHerosService {

  heroes$ = new BehaviorSubject<Superheroe[]>([]);
  heroesBackup: Superheroe[] = [];
  dataUrl = 'http://localhost:3000/data'

  constructor(
    private http: HttpClient
  ) {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.http.get<Superheroe[]>(this.dataUrl).subscribe(res => {
      this.heroes$.next(res) 
      this.heroesBackup = res;
    });
  }

  getHeroes(): Observable<any> {
    return this.heroes$.asObservable();
  }

  editHeroe(updatedHero: Superheroe){
    this.http.get<Superheroe[]>(this.dataUrl).subscribe(res => {
      const currentList = res;
      const index = currentList.findIndex(i => i.id === updatedHero.id);
      console.log(index)
      if(index !== -1){
        currentList[index] = updatedHero;
      }
      this.heroes$.next(currentList)
    });
  }

  getHeroById(id: number): Observable<Superheroe | undefined> {
    return this.http.get<Superheroe[]>(this.dataUrl).pipe(map(res=> res.find(i=> i.id == id)))
  }

  createHeroe(newHero: Superheroe) {
    this.http.get<Superheroe[]>(this.dataUrl).subscribe(res => {
      const currentList = res;
      newHero.id = new Date().getUTCMilliseconds();
      currentList.push(newHero);
      this.heroesBackup = currentList;
      this.heroes$.next(currentList);
    });
  }

  deleteHeroeById(heroe: Superheroe) {
    this.http.get<Superheroe[]>(this.dataUrl).subscribe(res => {
      let currentList = res;
      let index = currentList.findIndex(x => x.id == heroe.id);
      if (index > -1) {
        currentList.splice(index, 1);
      }
      this.heroes$.next(currentList);
    });
  }

  searchByString(name: string) {
    let currentList = this.heroesBackup;
    currentList = currentList.filter(
      (h) =>
        h.name.toLowerCase().includes(name.toLowerCase()) ||
        h.realName.toLowerCase().includes(name.toLowerCase())
    );
    this.heroes$.next(currentList)
  }
}
