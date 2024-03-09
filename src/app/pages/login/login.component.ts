import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupUsers: any[] = [];
  signupObj: any = {
    email: '',
    password: ''
  };
  loginObj: any = {
    email: '',
    password: ''
  };

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const localData = localStorage.getItem('signUpUsers');
      if (localData != null) {
        this.signupUsers = JSON.parse(localData);
      }
    }
  }

  onSignUp(): void {
    this.signupUsers.push(this.signupObj);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    }
    this.signupObj = {
      email: '',
      password: ''
    };
    alert("Registration successful");
  }

  onLogin(): void {
    const isUserExist = this.signupUsers.find(m => m.email == this.loginObj.email && m.password == this.loginObj.password);
    if (isUserExist != undefined) {
      this.router.navigate(['/home']);
    } else {
      alert('Incorrect email or password');
    }
  }
}
