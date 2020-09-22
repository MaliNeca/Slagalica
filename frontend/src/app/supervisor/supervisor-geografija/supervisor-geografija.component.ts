import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { UsersService } from 'src/app/users.service';
import { Word } from 'src/app/models/word.model';
@Component({
  selector: 'app-supervisor-geografija',
  templateUrl: './supervisor-geografija.component.html',
  styleUrls: ['./supervisor-geografija.component.css']
})
export class SupervisorGeografijaComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  private wordsToCheck : Array<string> = [];
  private bodovi : number = 0;br:number = 0;
  
  displayedColumns: string[] = ['Word', 'no'];
  wordsRequest : Word[] =[];


  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var user =  JSON.parse(localStorage.getItem('user'));
    this.username = user[0].firstName + " " + user[0].lastName + " " + user[0].type;
    this.bodovi = 0;
    this.br = 0;
    this.service.getWords().subscribe((word:Word[])=>{
      this.wordsRequest = word;
    });
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  anagram(){
    this.router.navigate(['/supervisor/anagram']);
  }

  five(){
    this.router.navigate(['/supervisor/5x5']);
  }

  zanimljivaGeografija(){
    this.router.navigate(['/supervisor/geografija']);
  }

  pehar(){
    this.router.navigate(['/supervisor/pehar']);
  }

  insertWords(checkWords : Array<string>){
    this.wordsToCheck = checkWords;
  }

  submit(){
    this.bodovi++;
  }
  getBodovi(){

    return this.bodovi;
  }
  allow(word: string){
    this.br++;
    this.bodovi+=4;
    
    this.service.removeWord(word).subscribe();
    if(this.wordsRequest.length == this.br){
      this.service.insertPoints(this.bodovi).subscribe();
    }
    
  }

  block(word: string){
    this.br++;
    this.service.removeWord(word).subscribe();
    if(this.wordsRequest.length == this.br){
      this.service.insertPoints(this.bodovi).subscribe();
    }
  }

  @Input() username :string|null;

  
 



 

  
  

  
}
