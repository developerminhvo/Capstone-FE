import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import swal from 'sweetalert2';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  type = 'password';

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService) {
    this.initLoginForm();
  }

  ngOnInit() {

  }

  initLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    }, {
      validators: this.validatePassword
    });
  }

  validatePassword(form: FormGroup) {
    return undefined;
  }

  login(): void {
    if (this.loginForm.valid) {
      this._authService.login({} as any)
        .pipe(
          tap(() => { }),
          catchError((err) => {
            swal.fire('Lỗi', 'Sai tên đăng nhập hoặc mật khẩu', 'error');
            return of(undefined);
          })
        ).subscribe();
    } else {
      this.loginForm.get('username').markAsTouched();
      this.loginForm.get('password').markAsTouched();      
      swal.fire('Thông tin bắt buộc', 'Vui lòng nhập đầy đủ thông tin để truy cập vào hệ thống', 'error');
    }
  }
}
