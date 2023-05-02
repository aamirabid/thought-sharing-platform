import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/http/AuthenticationService/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(private auth: AuthenticationService) {}

  signOut(): void {
    this.auth.signOut();
  }
}
