import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsRoomComponent } from './news-room.component';

describe('NewsRoomComponent', () => {
  let component: NewsRoomComponent;
  let fixture: ComponentFixture<NewsRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsRoomComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
