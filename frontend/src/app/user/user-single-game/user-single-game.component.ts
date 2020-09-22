import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { AnagramGameComponent } from 'src/app/anagram-game/anagram-game.component';
import { ComponentRef } from '@angular/core/src/render3';
import { UsersService } from 'src/app/users.service';
import { Game } from 'src/app/models/game.model';
import { Anagram } from 'src/app/models/anagram.model';
import { Pehar } from 'src/app/models/pehar.model';
import { MojBrojComponent } from 'src/app/moj-broj/moj-broj.component';
import { PetGameComponent } from 'src/app/pet-game/pet-game.component';
import { GeografijaGameComponent } from 'src/app/geografija-game/geografija-game.component';
import { Geografija } from 'src/app/models/geografija.model';
import { PeharGameComponent } from 'src/app/pehar-game/pehar-game.component';
import { SupervisorGeografijaComponent } from 'src/app/supervisor/supervisor-geografija/supervisor-geografija.component';

@Component({
  selector: 'app-user-single-game',
  templateUrl: './user-single-game.component.html',
  styleUrls: ['./user-single-game.component.css']
})
export class UserSingleGameComponent implements OnInit {

  mobileQuery: MediaQueryList;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild(SupervisorGeografijaComponent) geografijaComponent: SupervisorGeografijaComponent;


  private _mobileQueryListener: () => void;
  private componentRef: any;
  private user: any;
  private igrao: boolean = false;
  private singleGameObj: Game;
  private anagramObj: Anagram;
  private peharObj: Pehar;
  private trenutnaIgra: number;
  private geografijaObj: Geografija;
  checkWords: Array<string> = [];
  found:boolean = false;
  bodoviAnagram: number = 0;
  bodoviMojBroj: number = 0;
  bodoviPet: number = 0;
  bodoviPehar: number = 0;
  timeLeft: number = 0;
  interval;

  slovo: string;
  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, private service: UsersService, media: MediaMatcher, private componentFactoryResolver: ComponentFactoryResolver) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.igrao = false;
    this.bodovi = 0;
    this.igra = "Anagram";
    this.trenutnaIgra = 0;
    this.buttonText = "Insert Answer";
    this.bodoviGeografija = 0;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.username = this.user[0].firstName + " " + this.user[0].lastName + " " + this.user[0].type;
    //this.geografijaComponent.insertWords([]);
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AnagramGameComponent);
    this.componentRef = this.container.createComponent(componentFactory);


    //provera da li igra postoji
    this.service.getSingleGame().subscribe((game: Game) => {
      if (game[0]) {
        //igra postoji
        this.singleGameObj = game[0];
        this.service.checkSingleGame(this.user[0].username).subscribe((game: Game) => {
          if (game[0]) {
            //vec je igrao
            this.igrao = true;
            this.error = "Vec ste odigrali igru";

          } else {
            //igra
            this.startTimer(60);
            this.service.getAnagrams(this.singleGameObj.anagramID).subscribe((anagram: Anagram) => {

              if (anagram[0]) {
                this.componentRef.instance.pitanje = anagram[0].Anagrami[0].zagonetka;
                this.anagramObj = anagram[0];
              } else {
                console.log("Greska kod anagrama");
              }


            })


          }
        });

      } else {
        this.error = "Igra nije kreirana";
      }
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

  createGame() {

  }

  joinGame() {

  }

  singleGame() {
    this.router.navigate(['user/singleGame']);
  }

  score() {
    this.router.navigate(['user/score']);
  }

  gameScore() {
    this.router.navigate(['user/gameScore']);
  }

  submit() {

    this.error = "";
    this.kraj = false;
    if (!this.igrao) {
      //anagram

      if (this.trenutnaIgra == 0) {
        if (this.componentRef.instance.anagramForm.get('odgovor').valid) {
          this.pauseTimer();
          if (this.componentRef.instance.anagramForm.get('odgovor').value == this.anagramObj.Anagrami[0].resenje) {
            this.bodoviAnagram += 10;

          } else {

          }
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MojBrojComponent);
          this.container.clear();
          this.componentRef = this.container.createComponent(componentFactory);

          this.igra = "Moj Broj";
          this.trenutnaIgra = 1;

          this.startTimer(60);
        } else {
          this.error = "Unesite ispravan odgovor";
        }

        this.bodovi += this.bodoviAnagram;
      } else if (this.trenutnaIgra == 1) {
        //moj broj

        if (this.componentRef.instance.mojBrojForm.get('odgovor').valid) {
          this.pauseTimer();
          var vara = false;

          var res = this.componentRef.instance.mojBrojForm.get('odgovor').value.match(/\d+/g).map(Number);

          res.forEach(element => {
            var index = this.componentRef.instance.brojevi.indexOf(element)
            if (index == -1) {
              vara = true;
              this.error = "Nemoj da varas";

            } else {
              this.componentRef.instance.brojevi.splice(index, 1);
            }
          });
          if (eval(this.componentRef.instance.mojBrojForm.get('odgovor').value) == this.componentRef.instance.tiles[0].value) {
            if (!vara) this.bodoviMojBroj = this.bodoviMojBroj + 10;

          }
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PetGameComponent);
          this.container.clear();
          this.componentRef = this.container.createComponent(componentFactory);

          this.igra = "5x5";
          this.trenutnaIgra = 2;
          this.buttonText = "Next Game";
          this.bodovi += this.bodoviMojBroj;
          this.startTimer(60);
        } else {
          this.error = "Unesite ispravan odgovor";
        }
      } else if (this.trenutnaIgra == 2) {
        //5x5
        this.pauseTimer();
        this.buttonText = "Insert Answer";
        this.bodoviPet += this.componentRef.instance.bodoviPet;
        this.bodovi += this.bodoviPet;
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(GeografijaGameComponent);
        this.container.clear();
        this.componentRef = this.container.createComponent(componentFactory);
        var b = Math.floor(Math.random() * Math.floor(2));

        if (b == 0) {
          this.slovo = 'K';
        } else this.slovo = 'V';
        this.igra = "Zanimljiva Geografija na slovo " + this.slovo;
        this.trenutnaIgra = 3;
        this.startTimer(120);
      } else if (this.trenutnaIgra == 3) {
        //geografija

        this.pauseTimer();
        this.service.getGeografija(this.slovo).subscribe((geografija: Geografija) => {

          if (geografija[0]) {

            this.geografijaObj = geografija[0];
            if (this.geografijaObj.Geografija[0].odgovori.length == 8) {
              var drzave = this.geografijaObj.Geografija[0].odgovori[0].termin.split(",");
              var gradovi = this.geografijaObj.Geografija[0].odgovori[1].termin.split(",");
              var jezera = this.geografijaObj.Geografija[0].odgovori[2].termin.split(",");
              var planine = this.geografijaObj.Geografija[0].odgovori[3].termin.split(",");
              var reke = this.geografijaObj.Geografija[0].odgovori[4].termin.split(",");
              var zivotinje = this.geografijaObj.Geografija[0].odgovori[5].termin.split(",");
              var biljke = this.geografijaObj.Geografija[0].odgovori[6].termin.split(",");
              var muzickeGrupe = this.geografijaObj.Geografija[0].odgovori[7].termin.split(",");



              this.componentRef.instance.geografijaGameForm.get('drzave').value.split(",").slice(0, 8).forEach(element => {
                if (element) {
                  if (drzave.includes(element)) {
                    this.bodoviGeografija += 2;
                  } else {
                    this.checkWords.push(element);
                  }
                }
              });

              this.componentRef.instance.geografijaGameForm.get('gradovi').value.split(",").slice(0, 8).forEach(element => {
                if (element) {
                  if (gradovi.includes(element)) {
                    this.bodoviGeografija += 2;
                  } else {
                    this.checkWords.push(element);
                  }
                }
              });
              this.componentRef.instance.geografijaGameForm.get('jezera').value.split(",").slice(0, 8).forEach(element => {
                if (element) {
                  if (jezera.includes(element)) {
                    this.bodoviGeografija += 2;
                  } else {
                    this.checkWords.push(element);
                  }
                }
              });
              this.componentRef.instance.geografijaGameForm.get('planine').value.split(",").slice(0, 8).forEach(element => {
                if (element) {
                  if (planine.includes(element)) {
                    this.bodoviGeografija += 2;
                  } else {
                    this.checkWords.push(element);
                  }
                }
              });
              this.componentRef.instance.geografijaGameForm.get('reke').value.split(",").slice(0, 8).forEach(element => {
                if (element) {
                  if (reke.includes(element)) {
                    this.bodoviGeografija += 2;
                  } else {
                    this.checkWords.push(element);
                  }
                }
              });
              this.componentRef.instance.geografijaGameForm.get('zivotinje').value.split(",").slice(0, 8).forEach(element => {
                if (element) {
                  if (zivotinje.includes(element)) {
                    this.bodoviGeografija += 2;
                  } else {
                    this.checkWords.push(element);
                  }
                }
              });
              this.componentRef.instance.geografijaGameForm.get('biljke').value.split(",").slice(0, 8).forEach(element => {
                if (element) {
                  if (biljke.includes(element)) {
                    this.bodoviGeografija += 2;
                  } else {
                    this.checkWords.push(element);
                  }
                }
              });
              this.componentRef.instance.geografijaGameForm.get('muzickaGrupa').value.split(",").slice(0, 8).forEach(element => {
                if (element) {
                  if (muzickeGrupe.includes(element)) {
                    this.bodoviGeografija += 2;
                  } else {
                    this.checkWords.push(element);
                  }
                }
              });
              this.bodovi += this.bodoviGeografija;

              if (this.checkWords.length > 0) {
                console.log("Provera reci");
                console.log(this.checkWords);
                //input in base 
                this.checkWords.forEach(element => {
                  this.service.insertWords(element).subscribe((word:any)=>{
                    // while(!this.found ){
                    //   this.delay(5000).then(any=>{
                    //     this.service.getPoints().subscribe((point:any)=>{
                    //       if(point){
                    //         this.found = true;
                    //         this.bodoviGeografija+=point[0].bodovi;
                    //         console.log(this.found);
                    //       }
                          
                    //   });
    
                    //   console.log(this.found);
                    //   this.found = true;
                    //   });
                      
                      
                    // }


                  }
                    
                  );
                });
                
                //this.service.insertWords(this.checkWords).subscribe();

                //get result from base
                var br:number = 0;
               /* while(!this.found ){
                  this.delay(5000).then(any=>{
                    this.service.getPoints().subscribe((point:any)=>{
                      if(point){
                        this.found = true;
                        this.bodoviGeografija+=point[0].bodovi;
                        console.log(this.found);
                      }
                      
                  });

                  console.log(this.found);
                  this.found = true;
                  });
                  
                  
                }*/
                
                
                
                // this.geografijaComponent.insertWords(this.checkWords);

                // while(this.geografijaComponent.getBodovi()<1){

                // }


              }

              const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PeharGameComponent);
              this.container.clear();
              this.componentRef = this.container.createComponent(componentFactory);
              this.startTimer(60);
              this.igra = "Pehar";
              this.trenutnaIgra = 4;

            } else {
              console.log("Greska kod geografije");
            }
          }
        });
        this.buttonText = "Finish";


      } else if (this.trenutnaIgra == 4) {
        //pehar
        this.pauseTimer();
        
        this.bodoviPehar += this.componentRef.instance.bodoviPehar;
        this.bodovi += this.bodoviPehar;
        this.kraj = true;
        this.trenutnaIgra = 5;

        this.container.clear();
        this.service.insertSingleGameUser(this.user[0].username, this.bodovi).subscribe((game: Game) => {

        });


      } else if (this.trenutnaIgra == 5) {
        
        this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() =>
          this.router.navigate(['user/singleGame']));

      }
    }

  }


  startTimer(time: number) {
    this.timeLeft = time;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.trenutnaIgra++;
        // this.timeLeft = time;
        // this.changeGame(this.trenutnaIgra);
        this.timeLeft = time;
        this.submit();


      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  changeGame(igra: number) {
    let componentFactory = null;
    if (!this.igrao) {
      switch (igra) {

        case 1:
          this.igra = "Moj Broj";
          componentFactory = this.componentFactoryResolver.resolveComponentFactory(MojBrojComponent);
          this.container.clear();
          this.componentRef = this.container.createComponent(componentFactory);
          break;
        case 2:
          this.igra = "5x5";
          this.buttonText = "Next Game";
          componentFactory = this.componentFactoryResolver.resolveComponentFactory(PetGameComponent);
          this.container.clear();
          this.componentRef = this.container.createComponent(componentFactory);
          break;
        case 3:
          this.buttonText = "Insert Answer";
          this.bodoviPet += this.componentRef.instance.bodoviPet;
          this.bodovi += this.bodoviPet;
          var b = Math.floor(Math.random() * Math.floor(2));
          if (b == 0) {
            this.slovo = 'K';
          } else this.slovo = 'V';
          this.igra = "Zanimljiva Geografija na slovo " + this.slovo;
          componentFactory = this.componentFactoryResolver.resolveComponentFactory(GeografijaGameComponent);
          this.container.clear();
          this.componentRef = this.container.createComponent(componentFactory);

          break;
        case 4:
          this.bodovi += this.bodoviGeografija;
          this.igra = "Pehar";
          componentFactory = this.componentFactoryResolver.resolveComponentFactory(PeharGameComponent);
          this.container.clear();
          this.componentRef = this.container.createComponent(componentFactory);
          this.buttonText = "Finish";
          break;

        case 5:
          this.pauseTimer();
          this.bodoviPehar += this.componentRef.instance.bodoviPehar;
          this.bodovi += this.bodoviPehar;
          this.kraj = true;
          this.container.clear();

          break;
        default:
          break;
      }
    } else {
      this.pauseTimer();
    }

  }
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
}
  @Input() username: string | null; error: string | null; bodovi: number | 0; igra: string | null; buttonText: string | null; bodoviGeografija: number | 0; kraj: boolean | false;

}
