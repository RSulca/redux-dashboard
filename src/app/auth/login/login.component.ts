import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actionsU from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin: FormGroup;
  loading: boolean;
  subsRx: Subscription;

  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router, private st: Store<AppState>) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.loading = false;
  }

  ngOnInit(): void {
    this.subsRx = this.st.select('isLoading').subscribe(({ isLoading }) => {
      this.loading = isLoading;
    })
  }

  ngOnDestroy(): void {
    this.subsRx.unsubscribe();
  }

  send() {
    this.st.dispatch(actionsU.isLoading());
    // Swal.fire({
    //   title: 'Loading',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    this._auth.login(this.formLogin.value).then(({ user }) => {
      // Swal.close();
      this.router.navigateByUrl("/");
      this.st.dispatch(actionsU.stopLoading());
    }).catch(error => {
      this.st.dispatch(actionsU.stopLoading());
      // Swal.fire('Error', error.message, 'error')
      this.formLogin.reset();
    })
  }

}
