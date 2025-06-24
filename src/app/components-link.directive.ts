import { OnInit, ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ComponentsListService } from './components-list.service';

@Directive({ selector: '[npgComponentLink]' })
export class ComponentLinkDirective implements OnInit, OnDestroy {
  private componentsListService = inject(ComponentsListService);
  private cd = inject(ChangeDetectorRef);
  private elementRef = inject<ElementRef<Element>>(ElementRef);

  private destroy$ = new Subject<void>();

  @Input() npgComponentLink: string = '';

  @HostBinding('class.selected')
  selected = false;

  constructor() {}

  ngOnInit() {
    let isFirstEmission = true;
    this.componentsListService.selectedLink$
      .pipe(
        map((selectedLink: string) => this.npgComponentLink === selectedLink),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((isSelected) => {
        this.selected = isSelected;
        this.cd.markForCheck();

        if (isFirstEmission) {
          isFirstEmission = false;
        } else {
          this.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
