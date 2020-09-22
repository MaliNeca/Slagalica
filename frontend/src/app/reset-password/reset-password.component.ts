import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ValidationService } from '../validation.service';
import { User } from '../user.model';
import { Session } from 'protractor';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    jmbg: new FormControl('')
  });



  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      username: ['', Validators.required],
      jmbg: ['', [Validators.required, ValidationService.jmbgValidator]]
    });
      localStorage.clear();

  }

  submit() {
    if (this.resetForm.invalid) {
      return;
    }

    this.service.checkJMBG(this.resetForm.get('username').value, this.resetForm.get('jmbg').value).subscribe((user: User) => {
        if(user){
          sessionStorage.setItem('username', "" + user.username);
          sessionStorage.setItem('question', "" + user.question);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/resetQuestion']);
        }else{
          this.error = "Invalid input, try again";
        }
    })
  }
  @Input() error: string | null;
}
