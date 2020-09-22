import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ValidationService } from '../validation.service';
import { Session } from 'inspector';
import { User } from '../user.model';

@Component({
  selector: 'app-reset-password-question',
  templateUrl: './reset-password-question.component.html',
  styleUrls: ['./reset-password-question.component.css']
})
export class ResetPasswordQuestionComponent implements OnInit {
 
  resetQuestionForm: FormGroup = new FormGroup({
    answer: new FormControl('')
  });

 
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService) { }

  ngOnInit() {
    this.question = sessionStorage.getItem("question");
    this.resetQuestionForm = this.formBuilder.group({
     
      answer: ['', Validators.required]
    });
  
  }

  submit(){
    if(this.resetQuestionForm.invalid){
      return;
    }
    this.service.checkQuestion(sessionStorage.getItem('username'),this.resetQuestionForm.get('answer').value).subscribe((user: User) => {
      if(user){
        this.error = this.resetQuestionForm.get('answer').value;
        this.router.navigate(['/resetNewPassword']);
      }else{
        sessionStorage.clear();
        this.router.navigate(['/login']);
      }
  })
    
    
    
  }
  @Input() error: string | null; question: string | null;
}
