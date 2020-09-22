import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ValidationService } from '../validation.service';
import { User } from '../user.model';

@Component({
  selector: 'app-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.css']
})
export class ResetNewPasswordComponent implements OnInit {

  resetNewQuestionForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmpassword: new FormControl('')
  });



  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService) { }

  ngOnInit() {
    this.resetNewQuestionForm = this.formBuilder.group({
      password: ['', [Validators.required,ValidationService.passwordValidator]],
      confirmpassword: ['', Validators.required]
    });

  }

  submit() {
    if (this.resetNewQuestionForm.invalid) {
      return;
    }
    if (this.resetNewQuestionForm.get('password').value != this.resetNewQuestionForm.get('confirmpassword').value) {
      this.error = " Password doesnt match ";
      return;
    }
 
     this.service.changePassword(sessionStorage.getItem('username'),this.resetNewQuestionForm.get('password').value).subscribe((user: User) => {
         if(user){
           sessionStorage.clear();
           this.router.navigate(['/login']);
         }else{
           this.error = "Invalid input, try again";
         }
     })
  }
  @Input() error: string | null;

}
