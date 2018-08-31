import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderlyFormComponent } from './elderly-form.component';

describe('ElderlyFormComponent', () => {
  let component: ElderlyFormComponent;
  let fixture: ComponentFixture<ElderlyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElderlyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElderlyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
