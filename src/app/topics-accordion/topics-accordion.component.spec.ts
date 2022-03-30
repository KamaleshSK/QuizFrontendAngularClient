import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsAccordionComponent } from './topics-accordion.component';

describe('TopicsAccordionComponent', () => {
  let component: TopicsAccordionComponent;
  let fixture: ComponentFixture<TopicsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
