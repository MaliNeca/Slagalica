
import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/users.service';
import { Pet } from 'src/app/models/pet.model';
@Component({
  selector: 'app-supervisor55',
  templateUrl: './supervisor55.component.html',
  styleUrls: ['./supervisor55.component.css']
})
export class Supervisor55Component implements OnInit {

  mobileQuery: MediaQueryList;
  petForm: FormGroup = new FormGroup({
    prva: new FormControl(''),
    druga: new FormControl(''),
    treca: new FormControl(''),
    cetvrta: new FormControl(''),
    peta: new FormControl(''),
    jsonFile: new FormControl('')
  });

  selectedFile : any;
  petObj : Pet;

  private _mobileQueryListener: () => void;

  constructor(private router: Router, private formBuilder:FormBuilder, private service: UsersService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var user =  JSON.parse(localStorage.getItem('user'));
    this.username = user[0].firstName + " " + user[0].lastName + " " + user[0].type;

    this.petForm = this.formBuilder.group({
      prva: ['',Validators.required],
      druga: ['',Validators.required],
      treca: ['',Validators.required],
      cetvrta: ['',Validators.required],
      peta: ['',Validators.required],
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
    if(this.petForm.get('prva').invalid || this.petForm.get('druga').invalid
       || this.petForm.get('treca').invalid 
       ||  this.petForm.get('cetvrta').invalid 
       ||  this.petForm.get('peta').invalid ){
      //file
     
     
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        
       
         this.petObj = <Pet> JSON.parse(fileReader.result.toString());
       
       //insert anagram
        this.petObj["5x5"].forEach(element => {
          this.service.insertPet(element[1], element[2], element[3], element[4], element[5]).subscribe((pet: Pet) => {
              
          });
        });
       
          
      }
      fileReader.readAsText(this.selectedFile);
      this.petForm.reset();
      
      
    }else{
      //rucno
      
      this.service.insertPet(this.petForm.get('prva').value, 
        this.petForm.get('druga').value,
        this.petForm.get('treca').value,
        this.petForm.get('cetvrta').value,
        this.petForm.get('peta').value).subscribe((pet: Pet) => {
              
      });
      this.petForm.reset();
     
    }
  }



  @Input() username :string|null;
}
