import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as actions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formRegister: FormGroup;
  subsRx: Subscription;
  loading: boolean;

  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router, private st: Store<AppState>) {
    this.formRegister = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
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

  ngOnDestroy(){
    this.subsRx.unsubscribe();
  }

  send() {
    this.st.dispatch(actions.isLoading());
    // Swal.fire({
    //   title: 'Loading',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   }
    // });
    this._auth.register(this.formRegister.value).then(userData => {
      // Swal.close();
      this.router.navigateByUrl("/");
      this.st.dispatch(actions.stopLoading());
    }).catch(error => {
      this.st.dispatch(actions.stopLoading());
      // Swal.fire('Error', error.message, 'error')
    });
  }



}
