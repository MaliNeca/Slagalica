import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Anagram } from './models/anagram.model';
import { Pehar } from './models/pehar.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password) {
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.uri}/login`, data);
  }

  checkUsername(username) {
    const data = {
      username: username
    };

    return this.http.post(`${this.uri}/checkUsername`, data);
  }
  register(firstName, lastName, mail, occup, username, password, gender, jmbg, picture, question, answer) {

    const data = {
      firstName: firstName,
      lastName: lastName,
      mail: mail,
      occupation: occup,
      username: username,
      password: password,
      gender: gender,
      jmbg: jmbg,
      picture: picture,
      question: question,
      answer: answer,
      type: "user",
      approved: "no"
    }

    return this.http.post(`${this.uri}/register`, data);
  }
  insertWords(word) {
    const data = {
      rec: word
    }
    return this.http.post(`${this.uri}/insertWords`, data);
  }
  checkJMBG(username, jmbg) {
    const data = {
      username: username,
      jmbg: jmbg
    }
    return this.http.post(`${this.uri}/checkJMBG`, data);
  }

  checkQuestion(username, answer) {
    const data = {
      username: username,
      answer: answer
    }
    return this.http.post(`${this.uri}/checkQuestion`, data);
  }

  changePassword(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/changePassword`, data);
  }

  getRequest() {
    return this.http.get(`${this.uri}/getRequest`);
  }

  allowRequest(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/allowRequest`, data);
  }

  blockRequest(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/blockRequest`, data);
  }

  insertAnagram(zagonetka: string, resenje: string) {
    const data = {
      zagonetka: zagonetka,
      resenje: resenje
    }
    return this.http.post(`${this.uri}/insertAnagram`, data);


  }

  insertPet(prva: string, druga: string, treca: string, cetvrta: string, peta: string) {
    const data = {
      prva: prva,
      druga: druga,
      treca: treca,
      cetvrta: cetvrta,
      peta: peta

    }
    return this.http.post(`${this.uri}/insertPet`, data);


  }

  insertPehar(data: any) {

    return this.http.post(`${this.uri}/insertPehar`, data);

  }

  getAnagrams(anagramID: any = null) {

    const data = {
      anagramID: anagramID
    }
    return this.http.post(`${this.uri}/getAnagrams`, data);
  }

  getPet() {
    return this.http.get(`${this.uri}/getPet`);
  }
  getWords(){
    return this.http.get(`${this.uri}/getWords`);
  }

  getPehars(peharID: any = null) {
    const data = {
      peharID: peharID
    }

    return this.http.post(`${this.uri}/getPehars`, data);
  }

  removeWord(word:string){
    const data={
      word: word
    }
    return this.http.post(`${this.uri}/removeWord`, data);
  }
  getPoints(){
    return this.http.get(`${this.uri}/getPoints`); 
  }
  insertPoints(bodovi:number){
    const data ={
      bodovi:bodovi
    }
    return this.http.post(`${this.uri}/insertPoints`, data);
  }
  insertSingleGame(datum: Date, anagramID: string, peharID: string) {

    var minDate: Date = new Date();
    minDate.setDate(datum.getDate());
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    var maxDate: Date = new Date();
    maxDate.setDate(datum.getDate());
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate.setHours(0);
    maxDate.setMinutes(0);
    maxDate.setSeconds(0);
    datum.setHours(10);
    datum.setMinutes(10);
    datum.setSeconds(10);

    const data = {
      minDate: minDate,
      maxDate: maxDate,
      datum: datum,
      anagramID: anagramID,
      peharID: peharID


    }

    return this.http.post(`${this.uri}/insertSingleGame`, data);
  }

  updateSingleGame(datum: Date, anagramID: string, peharID: string) {
    var minDate: Date = new Date();
    minDate.setDate(datum.getDate());
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    var maxDate: Date = new Date();
    maxDate.setDate(datum.getDate());
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate.setHours(0);
    maxDate.setMinutes(0);
    maxDate.setSeconds(0);
    datum.setHours(10);
    datum.setMinutes(10);
    datum.setSeconds(10);
    const data = {
      minDate: minDate,
      maxDate: maxDate,
      datum: datum,
      anagramID: anagramID,
      peharID: peharID


    }

    return this.http.post(`${this.uri}/updateSingleGame`, data);
  }


  checkSingleGame(username: string) {
    var minDate = new Date();
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate.setHours(0);
    maxDate.setMinutes(0);
    maxDate.setSeconds(0);

    const data = {
      username: username,
      minDate: minDate,
      maxDate: maxDate
    }
    return this.http.post(`${this.uri}/checkSingleGame`, data);
  }

  getSingleGame() {
    var minDate = new Date();
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate.setHours(0);
    maxDate.setMinutes(0);
    maxDate.setSeconds(0);
    console.log(minDate);
    const data = {

      minDate: minDate,
      maxDate: maxDate
    }
    return this.http.post(`${this.uri}/getSingleGame`, data);
  }

  getGeografija(slovo: string) {
    const data = {
      slovo: slovo
    }
    return this.http.post(`${this.uri}/getGeografija`, data);
  }

  insertSingleGameUser(username: string, bodovi: number) {
    var minDate = new Date();
    minDate.setHours(0);
    minDate.setMinutes(0);
    minDate.setSeconds(0);
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate.setHours(0);
    maxDate.setMinutes(0);
    maxDate.setSeconds(0);

    const data = {
      username: username,
      bodovi: bodovi,
      minDate: minDate,
      maxDate: maxDate
    }
    return this.http.post(`${this.uri}/insertSingleGameUser`, data);
  }

  getUserScore() {
    return this.http.get(`${this.uri}/getUserScore`);
  }

  getTop10() {


    return this.http.get(`${this.uri}/getTop`);

  }
}
