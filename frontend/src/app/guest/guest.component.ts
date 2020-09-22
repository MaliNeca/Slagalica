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
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatTable) tablee: MatTable<any>;
  mobileQuery: MediaQueryList;

  displayedColumns: string[] = ['position', 'username', 'bodovi'];

  dataSource: Scores[] = [];
  dataMesec: Scores[] = [];
  dataDan: Scores[]=[];
  gameObj : any ;
  buttonText: string;
  private _mobileQueryListener: () => void;
  flag = true;
  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private service: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

    this.buttonText = "Month";
    var minDate = new Date();
    minDate.setDate(minDate.getDate() - 20);
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate.setHours(0);
    maxDate.setMinutes(0);
    maxDate.setSeconds(0);
    console.log(minDate);
    

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDay.setHours(0);
    firstDay.setMinutes(0);
    firstDay.setSeconds(0);

    this.service.getTop10().subscribe((game: any) => {
      this.gameObj = game;
     
      var br: number = 1;
      var brMesec: number = 1;
      //mesec
      
      
      for (let index = 0; index < game.length; index++) {

        let datum = new Date(game[index].datum);
       
       
        if (datum >= firstDay && datum < maxDate) {


          var s: Scores = {
            position: brMesec,
            username: game[index].users.username,
            bodovi: game[index].users.bodovi
          }
          this.dataMesec.push(s);

         
          brMesec++;
        }
        if (brMesec == 11) break;

      }



      //20 dana
      for (let index = 0; index < game.length; index++) {

        let datum = new Date(game[index].datum);
        datum.setHours(0);
        datum.setMinutes(0);
        datum.setSeconds(0);
        
        if (datum >= minDate && datum < maxDate) {
          

          var s: Scores = {
            position: br,
            username: game[index].users.username,
            bodovi: game[index].users.bodovi
          }
          this.dataDan.push(s);

         
          br++;
        }
        if (br == 11) break;

      }
      this.change();
      
    });




  }

  change(){
    
    

    if(this.flag){
      
      this.buttonText = "Month";
      //mesec
      this.dataSource = this.dataMesec;
      this.table.renderRows();
      this.flag = false;
    }else{
      
      this.buttonText = "Last 20 days";
      
      this.flag =true;
      this.dataSource= this.dataDan;
      this.table.renderRows();
      

    }
  }

  logout() {

    this.router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }





}
