import { GeneralService } from './../../Services/general.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChildren('swiper') swiperRef!: SwiperComponent;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [true]
  });

  registrationForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
    password_confirm: [''],
  });

  showSignUp: boolean = false;
  forgotPass: boolean = false;

  validationMessage = {
    email: [
      { type: "required", message: "Please enter your mail" },
      { type: "pattern", message: "The email entered is incorrect. Try again" }
    ],
    password: [
      { type: "required", message: "Please enter your password" },
      { type: "pattern", message: "The password entered is incorrect. Try again" }
    ]
  }

  constructor(public route: Router, public navCtrl: NavController, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public authService: AuthService, private generalService: GeneralService) { }

  ngOnInit() {
  }

  get errorControl() {

    if (this.registrationForm)
      return this.registrationForm.controls;

    else
      return this.loginForm.controls;
    
  }

  showLoginPassword: boolean = false;

  toggleLoginPasswordVisibility() {

    this.showLoginPassword = !this.showLoginPassword;

  }

  showPassword: boolean = false;

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;

  }
  showConfirmPassword: boolean = false;

  toggleConfirmPasswordVisibility() {

    this.showConfirmPassword = !this.showConfirmPassword;

  }

  async processEmailPasswordLogin() {

    const loading = await this.loadingCtrl.create()

    await loading.present();

    if (this.loginForm.valid) {

      const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((error) => {

        console.log(error);

        loading.dismiss()

      })
      if (user) {

        loading.dismiss()

        this.route.navigate(['/landing'])

      }
      else {

        this.generalService.showToast('Enter a valid email/password','bottom','md')

        console.log('Provide the correct values..');

      }
    }

  }

  async processRegistration() {

    const loading = await this.loadingCtrl.create()

    await loading.present();

    if (this.registrationForm.valid) {

      const user = await this.authService.registerUser(this.registrationForm.value.email, this.registrationForm.value.password).catch((error) => {

        console.log(error)

        loading.dismiss()

      })

      if (user) {

        loading.dismiss()

        this.route.navigate(['/landing'])

      }
      else {

        console.log('Provide correct values..');

      }

    }
  }

  saveLogin () {
    if(this.loginForm.valid){
      localStorage.setItem("isLoggedIn", "true");

      console.log('Credentials Saved Successfully');  

    }
    else {

      console.log('Please enter the credentials..');
      
    }
     
  }

  goToLogin: boolean = false;

  email: any;
  
  async resetPassword() {

    this.authService.resetPassword(this.email).then(() => {

      console.log('Reset link sent')

      alert('Resent mail Sent')

    }).catch((error) => {

      console.log(error);      
    })
  }

  async processGoogleLogin() {

    // const loading = await this.loadingCtrl.create()
    
    // await loading.present();

      await this.authService.processGoogleAuth().then((data) => {

        console.log(data);

        this.route.navigate(['/landing'])

        // loading.dismiss()
        
      }).catch((err) => {

        console.log(err);
        
      });
  }

  async processFacebookLogin() {

    await this.authService.processFaceBookAuth().then((data) => {

      console.log(data)

      this.route.navigate(['/landing'])
      
    }).catch((err) => {

      console.log(err);
      
    });
  }



}
