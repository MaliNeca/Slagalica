import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Game } from '../models/game.model';
import { Pehar } from '../models/pehar.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  value: string;
  show: boolean;
}

@Component({
  selector: 'app-pehar-game',
  templateUrl: './pehar-game.component.html',
  styleUrls: ['./pehar-game.component.css']
})
export class PeharGameComponent implements OnInit {
  brojevi: Array<number> = [];
  tiles9: Tile[] = [];
  tiles8: Tile[] = [];
  tiles7: Tile[] = [];
  tiles6: Tile[] = [];
  tiles5: Tile[] = [];
  tiles4: Tile[] = [];
  tiles3: Tile[] = [];
  tiles4d: Tile[] = [];
  tiles5d: Tile[] = [];
  tiles6d: Tile[] = [];
  tiles7d: Tile[] = [];
  tiles8d: Tile[] = [];
  tiles9d: Tile[] = [];
  peharObj: Pehar;
  br: number = 0;
  bodoviPehar: number = 0;
  peharGameForm: FormGroup = new FormGroup({

    odgovor: new FormControl('')
  });
  constructor(private formBuilder: FormBuilder, private service: UsersService) { }

  ngOnInit() {
    this.peharGameForm = this.formBuilder.group({

      odgovor: ['']

    });
    for (let index = 0; index < 42; index++) {
      var t: Tile = {
        value: null, cols: 1, rows: 1, color: 'burlywood', show: true
      };
      if (index < 9) this.tiles9.push(t);
      else if (index < 17) this.tiles8.push(t);
      else if (index < 24) this.tiles7.push(t);
      else if (index < 30) this.tiles6.push(t);
      else if (index < 35) this.tiles5.push(t);
      else if (index < 39) this.tiles4.push(t);
      else this.tiles3.push(t);
    }

    for (let index = 0; index < 39; index++) {
      var t: Tile = {
        value: null, cols: 1, rows: 1, color: 'burlywood', show: true
      };
      if (index < 9) this.tiles9d.push(t);
      else if (index < 17) this.tiles8d.push(t);
      else if (index < 24) this.tiles7d.push(t);
      else if (index < 30) this.tiles6d.push(t);
      else if (index < 35) this.tiles5d.push(t);
      else this.tiles4d.push(t);

    }


    //dohvatanje pitanja

    this.service.getSingleGame().subscribe((game: Game) => {

      let singleGameObj: Game;
      singleGameObj = game[0];

      this.service.getPehars(singleGameObj.peharID).subscribe((pehar: Pehar) => {
        this.peharObj = pehar[0];


        this.pitanje = this.peharObj.Pehar[0]["9G"].Pitanje + "?";


      });
    });

  }
  submit() {
    
    switch (this.br) {
      case 0:
        if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["9G"].Odgovor) {
          //tacno
          for (let index = 0; index < this.tiles9.length; index++) {
            this.tiles9[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
            this.tiles9[index].color = "blue";

          }
          this.bodoviPehar++;
        } else {
          //netacno
          for (let index = 0; index < this.tiles9.length; index++) {
            this.tiles9[index].value = this.peharObj.Pehar[0]["9G"].Odgovor.charAt(index);
            this.tiles9[index].color = "red";

          }
        }
        console.log(this.peharObj.Pehar);
        this.pitanje = this.peharObj.Pehar[0]["8G"].Pitanje + "?";

        this.br++;
        break;
      case 1:
        if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["8G"].Odgovor) {
          //tacno
          for (let index = 0; index < this.tiles8.length; index++) {
            this.tiles8[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
            this.tiles8[index].color = "blue";

          }
          this.bodoviPehar++;
        } else {
          //netacno
          for (let index = 0; index < this.tiles8.length; index++) {
            this.tiles8[index].value = this.peharObj.Pehar[0]["8G"].Odgovor.charAt(index);
            this.tiles8[index].color = "red";

          }
        }
        this.pitanje = this.peharObj.Pehar[0]["7G"].Pitanje + "?";
        this.br++;
        break;
      case 2:
        if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["7G"].Odgovor) {
          //tacno
          for (let index = 0; index < this.tiles7.length; index++) {
            this.tiles7[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
            this.tiles7[index].color = "blue";

          }
          this.bodoviPehar++;
        } else {
          //netacno
          for (let index = 0; index < this.tiles7.length; index++) {
            this.tiles7[index].value = this.peharObj.Pehar[0]["7G"].Odgovor.charAt(index);
            this.tiles7[index].color = "red";

          }
        }
        this.pitanje = this.peharObj.Pehar[0]["6G"].Pitanje + "?";
        this.br++;
        break;
      case 3:
        if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["6G"].Odgovor) {
          for (let index = 0; index < this.tiles6.length; index++) {
            this.tiles6[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
            this.tiles6[index].color = "blue";

          }
          this.bodoviPehar++;

        } else {
          for (let index = 0; index < this.tiles6.length; index++) {
            this.tiles6[index].value = this.peharObj.Pehar[0]["6G"].Odgovor.charAt(index);
            this.tiles6[index].color = "red";

          }
        }
        this.pitanje = this.peharObj.Pehar[0]["5G"].Pitanje + "?";
        this.br++;
        break;
        break;
      case 4:
        if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["5G"].Odgovor) {
          for (let index = 0; index < this.tiles5.length; index++) {
            this.tiles5[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
            this.tiles5[index].color = "blue";

          }
          this.bodoviPehar++;
        } else {
          for (let index = 0; index < this.tiles5.length; index++) {
            this.tiles5[index].value = this.peharObj.Pehar[0]["5G"].Odgovor.charAt(index);
            this.tiles5[index].color = "red";

          }
        }
        this.pitanje = this.peharObj.Pehar[0]["4G"].Pitanje + "?";
        this.br++;
        break;
      case 5:
        if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["4G"].Odgovor) {
          for (let index = 0; index < this.tiles4.length; index++) {
            this.tiles4[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
            this.tiles4[index].color = "blue";

          }
          this.bodoviPehar++;
        } else {
          for (let index = 0; index < this.tiles4.length; index++) {
            this.tiles4[index].value = this.peharObj.Pehar[0]["4G"].Odgovor.charAt(index);
            this.tiles4[index].color = "red";

          }
        }
        this.pitanje = this.peharObj.Pehar[0]["3"].Pitanje + "?";
        this.br++;
        break;
      case 6:
        if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["3"].Odgovor) {
          for (let index = 0; index < this.tiles3.length; index++) {
            this.tiles3[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
            this.tiles3[index].color = "blue";

          }
          this.bodoviPehar++;
        } else {
          for (let index = 0; index < this.tiles3.length; index++) {
            this.tiles3[index].value = this.peharObj.Pehar[0]["3"].Odgovor.charAt(index);
            this.tiles3[index].color = "red";

          }
        }
        this.pitanje = this.peharObj.Pehar[0]["4D"].Pitanje + "?";
        this.br++;
        break;
      //4d
      case 7:
      if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["4D"].Odgovor) {
        for (let index = 0; index < this.tiles4d.length; index++) {
          this.tiles4d[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
          this.tiles4d[index].color = "blue";

        }
        this.bodoviPehar++;
      } else {
        for (let index = 0; index < this.tiles4d.length; index++) {
          this.tiles4d[index].value = this.peharObj.Pehar[0]["4D"].Odgovor.charAt(index);
          this.tiles4d[index].color = "red";

        }
      }
      this.pitanje = this.peharObj.Pehar[0]["5D"].Pitanje + "?";
      this.br++;
      break;

      case 8:
      if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["5D"].Odgovor) {
        for (let index = 0; index < this.tiles5d.length; index++) {
          this.tiles5d[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
          this.tiles5d[index].color = "blue";

        }
        this.bodoviPehar++;
      } else {
        for (let index = 0; index < this.tiles5d.length; index++) {
          this.tiles5d[index].value = this.peharObj.Pehar[0]["5D"].Odgovor.charAt(index);
          this.tiles5d[index].color = "red";

        }
      }
      this.pitanje = this.peharObj.Pehar[0]["6D"].Pitanje + "?";
      this.br++;
      break;
      case 9:
      if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["6D"].Odgovor) {
        for (let index = 0; index < this.tiles6d.length; index++) {
          this.tiles6d[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
          this.tiles6d[index].color = "blue";

        }
        this.bodoviPehar++;
      } else {
        for (let index = 0; index < this.tiles6d.length; index++) {
          this.tiles6d[index].value = this.peharObj.Pehar[0]["6D"].Odgovor.charAt(index);
          this.tiles6d[index].color = "red";

        }
      }
      this.pitanje = this.peharObj.Pehar[0]["7D"].Pitanje + "?";
      this.br++;
      break;
      case 10:
      if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["7D"].Odgovor) {
        for (let index = 0; index < this.tiles7d.length; index++) {
          this.tiles7d[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
          this.tiles7d[index].color = "blue";

        }
        this.bodoviPehar++;
      } else {
        for (let index = 0; index < this.tiles7d.length; index++) {
          this.tiles7d[index].value = this.peharObj.Pehar[0]["7D"].Odgovor.charAt(index);
          this.tiles7d[index].color = "red";

        }
      }
      this.pitanje = this.peharObj.Pehar[0]["8D"].Pitanje + "?";
      this.br++;
      break;
      case 11:
      if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["8D"].Odgovor) {
        for (let index = 0; index < this.tiles8d.length; index++) {
          this.tiles8d[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
          this.tiles8d[index].color = "blue";

        }
        this.bodoviPehar++;
      } else {
        for (let index = 0; index < this.tiles8d.length; index++) {
          this.tiles8d[index].value = this.peharObj.Pehar[0]["8D"].Odgovor.charAt(index);
          this.tiles8d[index].color = "red";

        }
      }
      this.pitanje = this.peharObj.Pehar[0]["9D"].Pitanje + "?";
      this.br++;
      break;
      case 12:
      if (this.peharGameForm.get('odgovor').value == this.peharObj.Pehar[0]["9D"].Odgovor) {
        for (let index = 0; index < this.tiles9d.length; index++) {
          this.tiles9d[index].value = this.peharGameForm.get('odgovor').value.charAt(index);
          this.tiles9d[index].color = "blue";

        }
        this.bodoviPehar++;
      } else {
        for (let index = 0; index < this.tiles9d.length; index++) {
          this.tiles9d[index].value = this.peharObj.Pehar[0]["9D"].Odgovor.charAt(index);
          this.tiles9d[index].color = "red";

        }
      }
      //kraj
      this.br++;
      break;


      default:
        break;
    }
    this.peharGameForm.get('odgovor').patchValue("");
  }

  @Input() pitanje: string | null;
}
