import { ListComponent } from './list.component';
import { LocalStorageService } from './../local-storage.service'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent(new LocalStorageService());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });
  });

  describe('selected providers', () => {
    it('should have no initial length', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });
  });
});

describe('New List Component Features', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      providers: [
        LocalStorageService
      ]
    }).compileComponents();

    let store = {};
    const mockLocalStorage = {
      getItemByKey: (key: string) => {
        return key in store ? store[key]: null
      },
      setItemByKey: (key: string, value: any) => {
        store[key] = value;
      },
      clear: () => {
        store = {}
      }
    }

    spyOn(localStorage, "getItem").and.callFake(mockLocalStorage.getItemByKey);
    spyOn(localStorage, "setItem").and.callFake(mockLocalStorage.setItemByKey);
    spyOn(localStorage, "clear").and.callFake(mockLocalStorage.clear);

    localStorage.setItem("unselected", JSON.stringify([{
      id: 11,
      name: 'Sauske Uchiha',
      address: 'Leaf Village',
      phone: '123456'
    }]));

    localStorage.setItem("selected", JSON.stringify([{
      id: 111,
      name: 'Naruto Uzumaki',
      address: 'Leaf Village',
      phone: '0123456'
    }]));

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it("should have one selected and one unselected on app init", () => {
    component.ngOnInit();
    expect(component.selectedProviders.length).toEqual(1);
    expect(component.unselectedProviders.length).toEqual(1);
  });

  it("should have zero selected and three unselected on app init", () => {
    localStorage.clear();

    component.ngOnInit();
    expect(component.selectedProviders.length).toEqual(0);
    expect(component.unselectedProviders.length).toEqual(3);
  });

  it("should move selected into unselected", () => {
    component.ngOnInit();

    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.cancel');
    button.click(component.selectedProviders[0]);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.unselectedProviders.length).toEqual(2);
      expect(component.selectedProviders.length).toEqual(0);
    });
  })

  it("should move unselected into selected", () => {
    component.ngOnInit();

    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.plus');
    button.click(component.unselectedProviders[0]);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.unselectedProviders.length).toEqual(0);
      expect(component.selectedProviders.length).toEqual(2);
    });
  })
})
