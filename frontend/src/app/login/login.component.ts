import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService) {
  }

  ngOnInit() {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    var passwordHash = require('password-hash');

        var hashedPassword = passwordHash.generate('super123');
  console.log(hashedPassword);

  }


  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.service.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe((user: User) => {
      if (user[0]) {
        var passwordHash = require('password-hash');

        var hashedPassword = user[0].password;

        if (passwordHash.verify(this.loginForm.get('password').value, hashedPassword)) {
          if (user) {
            if (user[0].type == 'user') {
              if (user[0].approved == 'yes') {
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['/user']);
              }
              else this.error = "Not approved";
            } else if (user[0].type == 'admin') {
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/admin']);
            }
            else if (user[0].type == 'super') {
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/supervisor']);
            }
          }
        } else {
          this.error = "Incorrect password, try again";
        }
      } else {
        this.error = "Incorrect, try again";

      }

    })
  }

  guest() {
    this.router.navigate(['/guest']);
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();
}
