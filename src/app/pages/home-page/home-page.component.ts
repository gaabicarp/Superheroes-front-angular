import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'src/data/mock-heroes';
import { Superheroe } from 'src/models/Superheroe.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @Input() heroes!: Superheroe[];
  @Output() editHeroe = new EventEmitter();
  @Output() newHero = new EventEmitter();


  dataSource = new MatTableDataSource<Superheroe>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  searchFilter: string = '';

  // heroes: Superheroe[] = data

  displayedColumns = ["imagen", "name", "realname", "gender", "weight", "age", "actions"]

  constructor() { 
    
  }
  
  ngOnInit(): void {
    this.dataSource.data = this.heroes;
  }

  onEditHero(e: Superheroe){
    console.log('asd')
    this.editHeroe.emit(e);
  }

  onNewHero(){
    this.newHero.emit();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
