import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsoneditorsComponent } from './jsoneditors.component';

describe('JsoneditorsComponent', () => {
  let component: JsoneditorsComponent;
  let fixture: ComponentFixture<JsoneditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JsoneditorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsoneditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
