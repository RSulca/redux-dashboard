import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) {
    this.formRegister = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
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
    console.log(this.formRegister.value);
    this._auth.register(this.formRegister.value).then(userData=>{
      console.log(userData);
      Swal.close();
      this.router.navigateByUrl("/");
    }).catch(error=>{
      Swal.fire('Error',error.message,'error')
    });
  }



}
