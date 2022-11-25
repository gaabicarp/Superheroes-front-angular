import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Superheroe } from 'src/models/Superheroe.model';

@Component({
  selector: 'app-edit-create-heroe',
  templateUrl: './edit-create-heroe.component.html',
  styleUrls: ['./edit-create-heroe.component.css']
})
export class EditCreateHeroeComponent implements OnInit {
  @Input() heroe: Superheroe | null = null;
  @Output() cancel = new EventEmitter();
  @Output() create = new EventEmitter();
  @Output() edit = new EventEmitter();

  superHeroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    if(this.heroe) this.setValueForm();
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
    this.cancel.emit();
  }

  onSend(){
    this.superHeroForm.controls['id'].value != -1 ?
      this.edit.emit(this.superHeroForm.value) :
      this.create.emit(this.superHeroForm.value)
  }

}
