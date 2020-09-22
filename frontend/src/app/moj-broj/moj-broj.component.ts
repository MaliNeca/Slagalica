import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  value: number;

}
@Component({
  selector: 'app-moj-broj',
  templateUrl: './moj-broj.component.html',
  styleUrls: ['./moj-broj.component.css']
})
export class MojBrojComponent implements OnInit {


  private index: number = 0;
  brojevi: Array<number> = [];
  tiles: Tile[] = [
    { value: null, cols: 8, rows: 1, color: 'lightblue' },
    { value: null, cols: 1, rows: 1, color: 'lightblue' },
    { value: null, cols: 1, rows: 1, color: 'lightblue' },
    { value: null, cols: 1, rows: 1, color: 'lightblue' },
    { value: null, cols: 1, rows: 1, color: 'lightblue' },
    { value: null, cols: 2, rows: 1, color: 'lightblue' },
    { value: null, cols: 2, rows: 1, color: 'lightblue' },
  ];

  mojBrojForm: FormGroup = new FormGroup({
    odgovor: new FormControl('')
  });
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mojBrojForm = this.formBuilder.group({
      odgovor: ['', [Validators.required, ValidationService.mojBrojValidator]]

    })
    
  }

  submit() {
    switch (this.index) {
      case 0:
        
        this.tiles[1].value = Math.floor(Math.random() * Math.floor(8) + 1);
        this.brojevi.push(this.tiles[1].value);
        this.index++;
        break;
      case 1:
        this.tiles[2].value = Math.floor(Math.random() * Math.floor(8) + 1);
        this.brojevi.push(this.tiles[2].value);
        this.index++;
        break;

      case 2:
        this.tiles[3].value = Math.floor(Math.random() * Math.floor(8) + 1);
        this.brojevi.push(this.tiles[3].value);
        this.index++;
        break;
      case 3:
        this.tiles[4].value = Math.floor(Math.random() * Math.floor(8) + 1);
        this.brojevi.push(this.tiles[4].value);
        this.index++;
        break;
      case 4:
        var br = Math.floor(Math.random() * Math.floor(3));
        var vl
        if (br == 0) vl = 10;
        else if (br == 1) vl = 15;
        else vl = 20;

        this.tiles[5].value = vl;
        this.brojevi.push(this.tiles[5].value);
        this.index++;
        break;
      case 5:
        var br = Math.floor(Math.random() * Math.floor(4));
        var vl
        if (br == 0) vl = 25;
        else if (br == 1) vl = 50;
        else if (br == 2) vl = 75;
        else vl = 100;
        this.tiles[6].value = vl;

        this.brojevi.push(this.tiles[6].value);


        this.index++;
        break;
      case 6:

        this.tiles[0].value = Math.floor(Math.random() * Math.floor(998) + 1);;
        this.index++;
        break;

      default:
        console.log(this.brojevi);
        break;
    }
  }
  @Input() pitanje: number;

}
