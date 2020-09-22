import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { UsersService } from 'src/app/users.service';
import { Game } from 'src/app/models/game.model';
import { MatTable } from '@angular/material';

export interface Scores {
  position: number,
  username: string,
  bodovi: number
}



@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.css']
})
export class UserScoreComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  mobileQuery: MediaQueryList;
  displayedColumns: string[] = ['position', 'username', 'bodovi'];
  dataSource : Scores[] = [ ];


  private _mobileQueryListener: () => void;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.username = user[0].firstName + " " + user[0].lastName + " " + user[0].type;
    
    this.service.getUserScore().subscribe((game: Game) => {
      var found = false;
    
      if(game[0]){

        for (let index = 0; index < 10; index++) {
          if (game[0].users[index]) {
       
            var s: Scores = {
              position : index+1,
              username : game[0].users[index].username,
              bodovi :game[0].users[index].bodovi
            }
            if( game[0].users[index].username == user[0].username) found = true;
            this.dataSource.push(s);
            
            this.table.renderRows();
  
  
  
          }
        }
      
        if(!found){
          
          var i = game[0].users.findIndex(userr => userr.username == user[0].username);
          if(i!=-1){
            var ss:Scores = {
              position : i+1,
              username : game[0].users[i].username,
              bodovi :game[0].users[i].bodovi
            }
            this.dataSource.push(ss);
            
            this.table.renderRows();
          }else{
            //nije igrao
          }
         
        }




      }

    
     
      
    });
  



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

  @Input() username: string | null;

}
