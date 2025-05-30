import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiaryComponent } from './apiary.component';

describe('ApiaryComponent', () => {
  let component: ApiaryComponent;
  let fixture: ComponentFixture<ApiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
