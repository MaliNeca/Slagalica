import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { UsersService } from '../users.service';
import { User } from '../user.model';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {


 
  mobileQuery: MediaQueryList;
  displayedColumns: string[] = ['First Name', 'Last Name','username',  'no'];
  userRequest : User[];



  private _mobileQueryListener: () => void;

  constructor(private router: Router, private service: UsersService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var user =  JSON.parse(localStorage.getItem('user'));
    this.username = user[0].firstName + " " + user[0].lastName + " " + user[0].type;
    this.service.getRequest().subscribe((user: User[])=>{
      this.userRequest = user;
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

  request(){
    this.router.navigate(['/admin/request']);
  }

  
  singleGame(){
    this.router.navigate(['/admin/singleGame']);
  }

  allow(username: string){
    this.service.allowRequest(username).subscribe((user:User)=>{
      this.service.getRequest().subscribe((user: User[])=>{
        this.userRequest = user;
      });
    });

    
  }

  block(username: string){
    this.service.blockRequest(username).subscribe((user:User)=>{
      this.service.getRequest().subscribe((user: User[])=>{
        this.userRequest = user;
      });
    });
    
  }
  

  @Input() username :string|null;

}
