import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _auth: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    this._auth.logout().then(()=> {
      Swal.fire('Thank you!','','success');
      this.router.navigateByUrl("/login");
    }).catch(error => console.error)
  }

}
