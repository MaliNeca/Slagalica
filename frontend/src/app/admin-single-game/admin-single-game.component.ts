import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { Anagram } from '../models/anagram.model';
import { Pehar } from '../models/pehar.model';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker, MatInput } from '@angular/material';
import { Game } from '../models/game.model';


export class AnagramInterface {
  zagonetka: string;
  resenje: string;
  id: string;
}
export class AnagramGroup {
  name: number;
  anagram: Array<AnagramInterface> = [];
}

export interface result{
  n: number,
nModified: number,
ok: number
}

@Component({
  selector: 'app-admin-single-game',
  templateUrl: './admin-single-game.component.html',
  styleUrls: ['./admin-single-game.component.css'],

})
export class AdminSingleGameComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  minDate = new Date();
  maxDate = new Date(2020, 0, 1);
  date = new FormControl();


  anagramObj: Anagram;
  anagramControl = new FormControl();
  anagramGroups: Array<AnagramGroup> = [];

  peharObj: Pehar;
  peharGroups: Array<AnagramGroup> = [];
  peharControl = new FormControl();

  datum: MatInput;
  private _mobileQueryListener: () => void;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.username = user[0].firstName + " " + user[0].lastName + " " + user[0].type;
    this.service.getAnagrams().subscribe((anagram: Anagram) => {
      this.anagramObj = anagram[0];
      for (let index = 0; index < this.anagramObj.Anagrami.length; index++) {
        let anagramIn = new AnagramInterface();
        anagramIn.zagonetka = this.anagramObj.Anagrami[index].zagonetka;
        anagramIn.resenje = this.anagramObj.Anagrami[index].resenje;
        anagramIn.id = this.anagramObj.Anagrami[index]._id;
        let anagr = new AnagramGroup();
        anagr.name = index;

        anagr.anagram.push(anagramIn);
        this.anagramGroups.push(anagr);


      }
     
      
    })

    this.service.getPehars().subscribe((pehar: Pehar) => {
      this.peharObj = pehar[0];
      for (let index = 0; index < this.peharObj.Pehar.length; index++) {
        let peharIn = new AnagramInterface();
        peharIn.zagonetka = this.peharObj.Pehar[index]["9G"].Pitanje;
        peharIn.resenje = this.peharObj.Pehar[index]["9G"].Odgovor;
        peharIn.id = this.peharObj.Pehar[index]._id;
        let peharG = new AnagramGroup();
        peharG.name = index;

        peharG.anagram.push(peharIn);
        this.peharGroups.push(peharG);

      }

      console.log(this.peharObj);
      console.log(this.peharGroups);

    })



  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  request() {
    this.router.navigate(['/admin/request']);
  }


  singleGame() {
    this.router.navigate(['/admin/singleGame']);
  }


  submit() {
   
    if(this.date.value && this.anagramControl.value && this.peharControl.value){
      this.service.insertSingleGame(this.date.value, this.anagramControl.value, this.peharControl.value).subscribe((game: Game)=>{
      
        if(game.hasOwnProperty('upserted')){
          this.poruka="Inserted";
        }else{
          this.service.updateSingleGame(this.date.value, this.anagramControl.value, this.peharControl.value).subscribe((result: result)=>{
            console.log(game);
              if(result.nModified>0){
                this.poruka="Updated";
              }else{
                this.poruka = "Not updated";
              }
              

          })
          
        }
       
      })
    }else{
      this.error = "Inccorect, try again";
    }

   

    
  }
  @Input() username: string | null; error : string|null; poruka:string|null;

}
