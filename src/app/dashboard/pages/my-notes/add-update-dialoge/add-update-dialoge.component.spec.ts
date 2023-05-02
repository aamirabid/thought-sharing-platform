import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDialogComponent as AddUpdateDialogeComponent } from './add-update-dialoge.component';

describe('AddUpdateDialogeComponent', () => {
  let component: AddUpdateDialogeComponent;
  let fixture: ComponentFixture<AddUpdateDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateDialogeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
