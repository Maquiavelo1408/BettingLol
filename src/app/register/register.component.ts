import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any ={
    username: null,
    email: null,
    password: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  body: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.body = this.fb.group({
      email: ['']
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void{
    const{username, email, password}= this.form;
    this.body.controls['email'].setValue(email);
    this.authService.register(username, email, password).subscribe(
      data=> {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed= false;
        this.authService.createVerification(this.body.value).toPromise().then(async ver=>{
          console.log(ver);
          await this.delay(1000);
          this.authService.sendEmail(this.body.value).subscribe(data1=>{
            console.log(data1);
          });
        })        
      },
      err=>{
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    )
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
