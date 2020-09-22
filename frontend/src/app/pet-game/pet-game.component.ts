import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Pet } from '../models/pet.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  value: string;
  show: boolean;

}
@Component({
  selector: 'app-pet-game',
  templateUrl: './pet-game.component.html',
  styleUrls: ['./pet-game.component.css']
})
export class PetGameComponent implements OnInit {
  vrednost : number = 1;
  vred : number = 1;
  private index: number = 0;
  brojevi: Array<number> = [];
  tiles: Tile[] = [];
  petObj: Pet;
  kraj: boolean = false;
  bodoviPet : number = 0;
  petGameForm: FormGroup = new FormGroup({
    odgovor: new FormControl('')
  });
  constructor(private formBuilder: FormBuilder, private service: UsersService) { }

  ngOnInit(): void {
    this.petGameForm = this.formBuilder.group({
      odgovor: ['', Validators.required]

    })
    
    for (let index = 0; index < 25; index++) {
      var t:Tile = {
        value: null, cols: 1, rows: 1, color: 'lightblue', show:false
      };
      this.tiles.push(t);
     
    }
    this.tiles[ Math.floor(Math.random() * Math.floor(25))].show = true;

    this.service.getPet().subscribe((pet: Pet) => {
      
     
      
      
      if (pet[0]) {
        var p : Pet;
        p=pet[0];
        var niz = p["5x5"][0];
        var index1 = 0;
        var max =5;
        var pos = 0;
       
        for (let index = 1; index < 6; index++) {
         
         while(index1< max){
          this.tiles[index1].value = niz[index].charAt(pos);
          index1++;
          pos++;
          

         }
        
         pos=0;
          max =max+5;
          
        }

      } else {
        console.log("Greska kod 5x5");
      }


    })
  }

  submit() {
   
      this.tiles.forEach(element => {
          if(element.value == this.petGameForm.get('odgovor').value){
            element.show = true;
            this.bodoviPet++;
          }
      });
      this.petGameForm.get('odgovor').patchValue("");
    }
  
  @Input() pitanje: number;

}
