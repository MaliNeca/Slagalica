import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/users.service';
import { Pehar } from 'src/app/models/pehar.model';

@Component({
  selector: 'app-supervisor-pehar',
  templateUrl: './supervisor-pehar.component.html',
  styleUrls: ['./supervisor-pehar.component.css']
})
export class SupervisorPeharComponent implements OnInit {

  mobileQuery: MediaQueryList;
  peharForm: FormGroup = new FormGroup({
    pitanje9G: new FormControl(''),
    odgovor9G: new FormControl(''),
    pitanje8G: new FormControl(''),
    odgovor8G: new FormControl(''),
    pitanje7G: new FormControl(''),
    odgovor7G: new FormControl(''),
    pitanje6G: new FormControl(''),
    odgovor6G: new FormControl(''),
    pitanje5G: new FormControl(''),
    odgovor5G: new FormControl(''),
    pitanje4G: new FormControl(''),
    odgovor4G: new FormControl(''),
    pitanje3: new FormControl(''),
    odgovor3: new FormControl(''),
    pitanje4D: new FormControl(''),
    odgovor4D: new FormControl(''),
    pitanje5D: new FormControl(''),
    odgovor5D: new FormControl(''),
    pitanje6D: new FormControl(''),
    odgovor6D: new FormControl(''),
    pitanje7D: new FormControl(''),
    odgovor7D: new FormControl(''),
    pitanje8D: new FormControl(''),
    odgovor8D: new FormControl(''),
    pitanje9D: new FormControl(''),
    odgovor9D: new FormControl(''),

    jsonFile: new FormControl('')
  });

  selectedFile: any;
  peharObj: Pehar;
  private _mobileQueryListener: () => void;


  constructor(private router: Router, private formBuilder: FormBuilder, private service: UsersService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.username = user[0].firstName + " " + user[0].lastName + " " + user[0].type;

    this.peharForm = this.formBuilder.group({
      pitanje9G: ['', Validators.required],
      odgovor9G: ['', Validators.required],
      pitanje8G: ['', Validators.required],
      odgovor8G: ['', Validators.required],
      pitanje7G: ['', Validators.required],
      odgovor7G: ['', Validators.required],
      pitanje6G: ['', Validators.required],
      odgovor6G: ['', Validators.required],
      pitanje5G: ['', Validators.required],
      odgovor5G: ['', Validators.required],
      pitanje4G: ['', Validators.required],
      odgovor4G: ['', Validators.required],
      pitanje3: ['', Validators.required],
      odgovor3: ['', Validators.required],
      pitanje4D: ['', Validators.required],
      odgovor4D: ['', Validators.required],
      pitanje5D: ['', Validators.required],
      odgovor5D: ['', Validators.required],
      pitanje6D: ['', Validators.required],
      odgovor6D: ['', Validators.required],
      pitanje7D: ['', Validators.required],
      odgovor7D: ['', Validators.required],
      pitanje8D: ['', Validators.required],
      odgovor8D: ['', Validators.required],
      pitanje9D: ['', Validators.required],
      odgovor9D: ['', Validators.required],
      jsonFile: ['', Validators.required]

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

  anagram() {
    this.router.navigate(['/supervisor/anagram']);
  }

  five() {
    this.router.navigate(['/supervisor/5x5']);
  }

  zanimljivaGeografija() {
    this.router.navigate(['/supervisor/geografija']);
  }

  pehar() {
    this.router.navigate(['/supervisor/pehar']);
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    if (this.peharForm.get('jsonFile').valid) {
      //file


      let fileReader = new FileReader();
      fileReader.onload = (e) => {


        this.peharObj = <Pehar>JSON.parse(fileReader.result.toString());

        //insert anagram
        this.peharObj.Pehar.forEach(element => {
          this.service.insertPehar(element).subscribe((pehar: Pehar) => {

          });
        });


      }
      fileReader.readAsText(this.selectedFile);
      this.peharForm.reset();


    } else {
      //rucno
      const data = {
        "9G" : {
          Pitanje: this.peharForm.get('pitanje9G').value,
          Odgovor: this.peharForm.get('odgovor9G').value
        },
        "8G" : {
          Pitanje: this.peharForm.get('pitanje8G').value,
          Odgovor: this.peharForm.get('odgovor8G').value
        },
        "7G" : {
          Pitanje: this.peharForm.get('pitanje7G').value,
          Odgovor: this.peharForm.get('odgovor7G').value
        },
        "6G" : {
          Pitanje: this.peharForm.get('pitanje6G').value,
          Odgovor: this.peharForm.get('odgovor6G').value
        },
        "5G" : {
          Pitanje: this.peharForm.get('pitanje5G').value,
          Odgovor: this.peharForm.get('odgovor5G').value
        },
        "4G" : {
          Pitanje: this.peharForm.get('pitanje4G').value,
          Odgovor: this.peharForm.get('odgovor4G').value
        },
        "3" : {
          Pitanje: this.peharForm.get('pitanje3').value,
          Odgovor: this.peharForm.get('odgovor3').value
        },
        "4D" : {
          Pitanje: this.peharForm.get('pitanje4D').value,
          Odgovor: this.peharForm.get('odgovor4D').value
        },
        "5D" : {
          Pitanje: this.peharForm.get('pitanje5D').value,
          Odgovor: this.peharForm.get('odgovor5D').value
        },
        "6D" : {
          Pitanje: this.peharForm.get('pitanje6D').value,
          Odgovor: this.peharForm.get('odgovor6D').value
        },
        "7D" : {
          Pitanje: this.peharForm.get('pitanje7D').value,
          Odgovor: this.peharForm.get('odgovor7D').value
        },
        "8D" : {
          Pitanje: this.peharForm.get('pitanje8D').value,
          Odgovor: this.peharForm.get('odgovor8D').value
        },
        "9D" : {
          Pitanje: this.peharForm.get('pitanje9D').value,
          Odgovor: this.peharForm.get('odgovor9D').value
        }

      }
      this.service.insertPehar(data).subscribe((pehar: Pehar) => {

        });
      this.peharForm.reset();

    }
  }


  @Input() username: string | null;
}
