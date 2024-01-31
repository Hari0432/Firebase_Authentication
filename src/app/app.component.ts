import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService) {

    this.auth.checkIfEmailExists('tesdt1@gmail.com').then((data) => {
      console.log(data)
    })

  }
}
