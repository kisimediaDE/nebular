import { Component, ElementRef, ViewChild } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestBed, ComponentFixture, fakeAsync, tick, inject, waitForAsync } from '@angular/core/testing';
import {
  NbLayoutRulerService,
  NbLayoutDimensions,
  NbLayoutModule,
  NbThemeService,
  NbThemeModule,
  NB_DOCUMENT,
} from '@kisimedia/nebular-theme';

let currentDocument;
let fixture: ComponentFixture<RulerTestComponent>;
let componentInstance: RulerTestComponent;
let rulerService: NbLayoutRulerService;

@Component({
  template: `
    <nb-layout [withScroll]="localScroll" #layout>
      <nb-layout-column>
        <div #resize></div>
      </nb-layout-column>
    </nb-layout>
  `,
  standalone: false,
})
class RulerTestComponent {
  @ViewChild('resize', { read: ElementRef }) private resizeElement: ElementRef;
  @ViewChild('layout', { read: ElementRef }) private layout: ElementRef;
  localScroll = false;

  setSize(width: string, height: string) {
    this.resizeElement.nativeElement.style.width = width;
    this.resizeElement.nativeElement.style.height = height;
  }

  useLocalScroll() {
    this.localScroll = true;
  }

  useGlobalScroll() {
    this.localScroll = false;
  }

  getScrollableElement() {
    return this.layout.nativeElement.querySelector('.scrollable-container');
  }
}

// This is rather a smoke test
describe('NbLayoutRulerService', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), NbThemeModule.forRoot(), NbLayoutModule],
      providers: [NbLayoutRulerService, NbThemeService, { provide: APP_BASE_HREF, useValue: '/' }],
      declarations: [RulerTestComponent],
    }).createComponent(RulerTestComponent);

    componentInstance = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeEach(waitForAsync(
    inject([NbLayoutRulerService, NB_DOCUMENT], (_rulerService, _document) => {
      rulerService = _rulerService;
      currentDocument = _document;
    }),
  ));

  afterEach(fakeAsync(() => {
    fixture.destroy();
    tick();
    fixture.nativeElement.remove();
  }));

  it('should get dimensions from document', (done) => {
    fixture.detectChanges();
    rulerService.getDimensions().subscribe((size: NbLayoutDimensions) => {
      expect(size.clientHeight).toEqual(currentDocument.documentElement.clientHeight);
      expect(size.clientWidth).toEqual(currentDocument.documentElement.clientWidth);
      expect(size.scrollHeight).toEqual(currentDocument.documentElement.scrollHeight);
      expect(size.scrollWidth).toEqual(currentDocument.documentElement.scrollWidth);
      done();
    });
  });

  it('should get dimensions from document when scrolls', (done) => {
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    rulerService.getDimensions().subscribe((size: NbLayoutDimensions) => {
      expect(size.clientHeight).toEqual(currentDocument.documentElement.clientHeight);
      expect(size.clientWidth).toEqual(currentDocument.documentElement.clientWidth);
      expect(size.scrollHeight).toEqual(currentDocument.documentElement.scrollHeight);
      expect(size.scrollWidth).toEqual(currentDocument.documentElement.scrollWidth);
      done();
    });
  });

  it('should get dimensions from scrollable', (done) => {
    componentInstance.useLocalScroll();
    fixture.detectChanges();
    const scrollable = componentInstance.getScrollableElement();
    rulerService.getDimensions().subscribe((size: NbLayoutDimensions) => {
      expect(size.clientHeight).toEqual(scrollable.clientHeight);
      expect(size.clientWidth).toEqual(scrollable.clientWidth);
      expect(size.scrollHeight).toEqual(scrollable.scrollHeight);
      expect(size.scrollWidth).toEqual(scrollable.scrollWidth);
      done();
    });
  });

  it('should get dimensions from scrollable when scrolls', (done) => {
    componentInstance.useLocalScroll();
    componentInstance.setSize('10000px', '10000px');
    fixture.detectChanges();
    const scrollable = componentInstance.getScrollableElement();
    rulerService.getDimensions().subscribe((size: NbLayoutDimensions) => {
      expect(size.clientHeight).toEqual(scrollable.clientHeight);
      expect(size.clientWidth).toEqual(scrollable.clientWidth);
      expect(size.scrollHeight).toEqual(scrollable.scrollHeight);
      expect(size.scrollWidth).toEqual(scrollable.scrollWidth);
      done();
    });
  });
});
