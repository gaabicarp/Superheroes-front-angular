import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/component/dialog/dialog.component';
import { data } from 'src/data/mock-heroes';
import { Superheroe } from 'src/models/Superheroe.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() heroesList!: Superheroe[];
  @Output() editHeroe = new EventEmitter();
  @Output() newHero = new EventEmitter();
  @Output() deleteHeroe = new EventEmitter();
  @Output() searchHeroe = new EventEmitter();

  dataSource = new MatTableDataSource<Superheroe>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchFilter: string = '';

  // heroes: Superheroe[] = data

  displayedColumns = [
    'imagen',
    'name',
    'realname',
    'gender',
    'weight',
    'age',
    'actions',
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = this.heroesList;
  }

  onEditHero(e: Superheroe) {
    console.log('asd');
    this.editHeroe.emit(e);
  }

  onNewHero() {
    this.newHero.emit();
  }

  openDialog(e: Superheroe) {
    const dialgoref = this.dialog.open(DialogComponent);

    dialgoref.afterClosed().subscribe((result) => {
      if (result) this.onDelete(e);
    });
  }

  onDelete(e: Superheroe) {
    this.deleteHeroe.emit(e);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch() {
    this.searchHeroe.emit(this.searchFilter);
  }

  ngOnChanges(changes: any): void {
    this.dataSource.data = changes.heroesList.currentValue;
  }
}
