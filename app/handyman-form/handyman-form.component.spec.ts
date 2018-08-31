import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandymanFormComponent } from './handyman-form.component';

describe('HandymanFormComponent', () => {
  let component: HandymanFormComponent;
  let fixture: ComponentFixture<HandymanFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandymanFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandymanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
