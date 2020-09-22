import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Anagram } from '../models/anagram.model';
import { stringify } from 'querystring';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  anagramForm: FormGroup = new FormGroup({
    zagonetka: new FormControl(''),
    odgovor: new FormControl(''),
    jsonFile: new FormControl('')
  });

  selectedFile : any;
  anagramObj: Anagram;

  private _mobileQueryListener: () => void;
  

  constructor(private router: Router, private formBuilder:FormBuilder, private service: UsersService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var user =  JSON.parse(localStorage.getItem('user'));
    this.username = user[0].firstName + " " + user[0].lastName + " " + user[0].type;
    this.anagramForm = this.formBuilder.group({
      zagonetka: ['',Validators.required],
      odgovor: ['',Validators.required],
      jsonFile: ['',Validators.required]
    })
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

  onFileChange(event){
    this.selectedFile = event.target.files[0];
  }

  submit(){
    if(this.anagramForm.get('zagonetka').invalid || this.anagramForm.get('odgovor').invalid){
      //file
     
     
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        
       
        this.anagramObj = <Anagram> JSON.parse(fileReader.result.toString());
       
        //insert anagram
        this.anagramObj.Anagrami.forEach(element => {
          this.service.insertAnagram(element.zagonetka, element.resenje).subscribe((anagram: Anagram) => {
              
          });
        });
       
          
      }
      fileReader.readAsText(this.selectedFile);
      this.anagramForm.reset();
      
      
    }else{
      //rucno
      
      this.service.insertAnagram(this.anagramForm.get('zagonetka').value, this.anagramForm.get('odgovor').value).subscribe((anagram: Anagram) => {
              
      });
      this.anagramForm.reset();
     
    }
  }
  
  @Input() username :string|null;
}
