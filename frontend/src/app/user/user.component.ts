import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { User } from '../user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var user =  JSON.parse(localStorage.getItem('user'));
    this.username = user[0].firstName + " " + user[0].lastName + " " + user[0].type;
    this.router.navigate(['user/singleGame']);
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  createGame(){

  }

  joinGame(){

  }

  singleGame(){
    this.router.navigate(['user/singleGame']);
  }

  score(){
    this.router.navigate(['user/score']);
  }

  gameScore(){
    this.router.navigate(['user/gameScore']);
  }

  @Input() username :string|null;
}
