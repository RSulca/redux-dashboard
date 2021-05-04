import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {
  }

  send() {
    Swal.fire({
      title: 'Loading',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    console.log(this.formLogin.value);
    this._auth.login(this.formLogin.value).then(userData => {
      console.log(userData);
      Swal.close();
      this.router.navigateByUrl("/")
    }).catch(error => {
      Swal.fire('Error',error.message,'error')
      this.formLogin.reset();
    })
  }

}
