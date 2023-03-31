import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/component/dialog/dialog.component';
import { SuperHerosService } from 'src/app/services/super-heros.service';
import { Superheroe } from 'src/models/Superheroe.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  
  dataSource = new MatTableDataSource<Superheroe>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  
  
  heroesList!: Superheroe[];
  searchFilter: string = '';

  displayedColumns = [
    'imagen',
    'name',
    'realname',
    'gender',
    'weight',
    'age',
    'actions',
  ];

  constructor(
    public dialog: MatDialog,
    private superHeroService: SuperHerosService) {}

  ngOnInit(): void {
    this.superHeroService.getHeroes().subscribe((res) => {
      this.heroesList = res;
      this.dataSource.data = res;
    });
  }

  openDialog(e: Superheroe) {
    const dialgoref = this.dialog.open(DialogComponent);

    dialgoref.afterClosed().subscribe((result) => {
      if (result) this.onDelete(e);
    });
  }

  onDelete(e: Superheroe) {
    this.superHeroService.deleteHeroeById(e)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {
    this.superHeroService.searchByString(this.searchFilter)
  }

}
