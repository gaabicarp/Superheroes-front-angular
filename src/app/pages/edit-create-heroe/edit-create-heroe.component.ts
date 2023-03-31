import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHerosService } from 'src/app/services/super-heros.service';
import { Superheroe } from 'src/models/Superheroe.model';

@Component({
  selector: 'app-edit-create-heroe',
  templateUrl: './edit-create-heroe.component.html',
  styleUrls: ['./edit-create-heroe.component.css']
})
export class EditCreateHeroeComponent implements OnInit {
  heroe: Superheroe | null = null;
  heroeId: number | null = null;

  isEdit: boolean = false;
  superHeroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private superHeroService: SuperHerosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.isEdit = this.route.snapshot.routeConfig?.path?.includes('edit') || false;
    if(this.isEdit) this.getHeroById();
  }

  getHeroById(){
    this.route.params.subscribe(param=>{
      this.heroeId = param["id"]
    })
    this.superHeroService.getHeroById(this.heroeId!).subscribe(res=>{
      this.heroe = res || null;
      this.setValueForm()
    })
  }

  createForm(): void {
    this.superHeroForm = this.fb.group({
      id: new FormControl(-1),
      name: new FormControl('', Validators.required),
      realName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),

    })
  }

  setValueForm(){
    this.superHeroForm.setValue({
      id: this.heroe?.id,
      name: this.heroe?.name,
      realName: this.heroe?.realName,
      gender: this.heroe?.gender,
      age: this.heroe?.age,
      weight: this.heroe?.weight,
      url: this.heroe?.url,
    })
  }

  onCancel(){
    this.router.navigateByUrl('');
  }

  onSend(){
    this.superHeroForm.controls['id'].value != -1 ?
      this.superHeroService.editHeroe(this.superHeroForm.value)
      : this.superHeroService.createHeroe(this.superHeroForm.value);

    this.router.navigateByUrl('');
  }

}
