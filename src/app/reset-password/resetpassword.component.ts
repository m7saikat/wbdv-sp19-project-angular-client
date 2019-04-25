import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  passwordReset: boolean;
  constructor(private userService: UserService) {
    this.passwordReset = false;
  }

  onSub(f) {
    // alert('hola');
    // alert();
    const email = f.value.email;
    if ( ! email.includes('@')) {
      alert('Invalid email address.');
    } else {
      this.userService.getUserByEmail(email).then(
        response => {
          if (response.success === false) {
            alert('User with email ' + email + ' does not exist.');
          } else {
            this.userService.resetPassword(response.user).then(
              res => {
                console.log('from APi ===>', res);
                if (res.success === true) {
                  this.userService.sendPasswordResetMail(res.email, res.password).then(
                    status => {
                      console.log('status ==>', status);
                      this.passwordReset = true;
                    }
                  );
                } else  {

                }
              }
            );
          }
        }
      );
    }
  }

  ngOnInit() {
    this.passwordReset = false;
  }

}
