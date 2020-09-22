import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ValidationService } from '../validation.service';
import { User } from '../user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    mail: new FormControl('mail'),
    occupation: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('password'),
    confirmpassword: new FormControl('confirmpassword'),
    gender: new FormControl(''),
    jmbg: new FormControl(''),
    picture: new FormControl(''),
    secretAnswer: new FormControl('')


  });

  selectedQuestion = "option1";


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, ValidationService.emailValidator]],
      occupation: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, ValidationService.passwordValidator]],
      confirmpassword: ['', Validators.required],
      gender: ['', Validators.required],
      jmbg: ['', [Validators.required, ValidationService.jmbgValidator]],
      picture: [''],
      secretAnswer: ['', Validators.required]
    });

  }


  submit() {

    if (this.registerForm.invalid) {
      if (this.registerForm.get('password').invalid) {
        this.error = ValidationService.getValidatorErrorMessage('invalidPassword');
      }
      if (this.registerForm.get('confirmpassword').invalid) {

        this.error = this.error + ValidationService.getValidatorErrorMessage('confirmPassword');
      }
      if (this.registerForm.get('jmbg').invalid) {

        this.error = this.error + ValidationService.getValidatorErrorMessage('invalidJMBG');
      }
      if (this.registerForm.get('mail').invalid) {

        this.error = this.error + ValidationService.getValidatorErrorMessage('invalidMail');
      }
      return;
    } else {
      this.error = "";
    }
    if (this.registerForm.get('password').value != this.registerForm.get('confirmpassword').value) {
      this.error = " Password doesnt match ";
      return;
    } else {
      this.error = "";
    }

    this.service.checkUsername(this.registerForm.get('username').value).subscribe((user: User) => {
      if (user) {
        this.error = "Incorrect username, try again";
        return;
      } else {
        var passwordHash = require('password-hash');

        var hashedPassword = passwordHash.generate(this.registerForm.get('password').value);

        console.log(hashedPassword); 
        this.service.register(
          this.registerForm.get('firstname').value,
          this.registerForm.get('lastname').value,
          this.registerForm.get('mail').value,
          this.registerForm.get('occupation').value,
          this.registerForm.get('username').value,
          hashedPassword,
          this.registerForm.get('gender').value,
          this.registerForm.get('jmbg').value,
          this.registerForm.get('picture').value,
          this.selectedQuestion,
          this.registerForm.get('secretAnswer').value).subscribe((user: User) => {
              
            this.router.navigate(['/login']);
          })

      }
    })
  }


  @Input() error: string | null;
}


