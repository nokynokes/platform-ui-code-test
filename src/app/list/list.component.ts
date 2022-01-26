import { Component, OnInit } from '@angular/core';
import { L } from '@angular/core/src/render3';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedProviders = [];
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];
  
  private unSelectedKey = "unselected";
  private selectedKey = "selected";

  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit() {
    const unselected = this._localStorageService.getItemByKey(this.unSelectedKey);
    if(!!unselected) {
      this.unselectedProviders = unselected;
    }

    const selected = this._localStorageService.getItemByKey(this.selectedKey);
    if(!!selected) {
      this.selectedProviders = selected;
    }
  }

  public handleUnselected(provider) {
    this.selectedProviders.push(provider);

    this.unselectedProviders = this.unselectedProviders.filter((p) => p.id !== provider.id);

    this.syncLocalStorage();
  }

  public handleSelected(provider) {
    this.unselectedProviders.push(provider);

    this.selectedProviders = this.selectedProviders.filter((p) => p.id !== provider.id);

    this.syncLocalStorage();
  }

  private syncLocalStorage() {
    this._localStorageService.setItemByKey(this.unSelectedKey, this.unselectedProviders);
    this._localStorageService.setItemByKey(this.selectedKey, this.selectedProviders);
  }

}
