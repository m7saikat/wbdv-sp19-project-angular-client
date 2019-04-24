import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUploadGifComponent } from './user-upload-gif.component';

describe('UserUploadGifComponent', () => {
  let component: UserUploadGifComponent;
  let fixture: ComponentFixture<UserUploadGifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUploadGifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUploadGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
