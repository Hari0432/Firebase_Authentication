import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  storage = localStorage

  constructor(public toastCtrl : ToastController) { }

  async showToast(message: string, position: 'top' | 'bottom' | 'middle' = 'bottom', mode : 'ios' | 'md' = 'ios') {

    let options : ToastOptions = {

      message: message,
      position: position,
      mode: mode,
      duration: 3000

    }

    const toast = await this.toastCtrl.create(options);

    toast.present()

  }

  
  saveLogin(email:string, password:string) {
    this.storage.setItem('email', email)
    this.storage.setItem('password',password)
  }
}
