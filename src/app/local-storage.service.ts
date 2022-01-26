import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getItemByKey(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

  public setItemByKey(key: string, value: any){
    localStorage.setItem(key,JSON.stringify(value));
  }
}
