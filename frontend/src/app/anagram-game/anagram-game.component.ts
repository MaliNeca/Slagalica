import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-anagram-game',
  templateUrl: './anagram-game.component.html',
  styleUrls: ['./anagram-game.component.css']
})
export class AnagramGameComponent implements OnInit {
  anagramForm: FormGroup = new FormGroup({
    odgovor: new FormControl('')
  });
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.anagramForm = this.formBuilder.group({
      odgovor: ['', [Validators.required, ValidationService.anagramValidator]]
      
    })
  }

  @Input() pitanje: string; ;
}
