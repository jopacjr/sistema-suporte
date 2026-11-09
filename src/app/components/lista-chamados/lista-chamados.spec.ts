import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChamados } from './lista-chamados';

describe('ListaChamados', () => {
  let component: ListaChamados;
  let fixture: ComponentFixture<ListaChamados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaChamados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaChamados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
