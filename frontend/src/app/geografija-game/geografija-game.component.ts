import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-geografija-game',
  templateUrl: './geografija-game.component.html',
  styleUrls: ['./geografija-game.component.css']
})
export class GeografijaGameComponent implements OnInit {

   geografijaGameForm: FormGroup = new FormGroup({
    drzave: new FormControl(''),
    gradovi:new FormControl(''),
    jezera:new FormControl(''),
    planine:new FormControl(''),
    reke:new FormControl(''),
    zivotinje:new FormControl(''),
    biljke:new FormControl(''),
    muzickaGrupa:new FormControl('')
  });
  constructor(private formBuilder: FormBuilder, private service: UsersService) { }

  ngOnInit() {
    this.geografijaGameForm = this.formBuilder.group({
      drzave: [''],
      gradovi: [''],
      jezera: [''],
      planine: [''],
      reke: [''],
      zivotinje: [''],
      biljke: [''],
      muzickaGrupa: ['']

    })
  }

}
