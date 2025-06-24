import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { NB_DOCUMENT } from '@kisimedia/nebular-theme';
import { ComponentsListService } from './components-list.service';
import { ComponentLink } from './playground-components';

import { LayoutDirectionToggleComponent } from './layout-direction-toggle/layout-direction-toggle.component';
import { LayoutThemeToggleComponent } from './layout-theme-toggle/layout-theme-toggle.component';
import { ComponentsListComponent } from './components-list/components-list.component'; // ggf. Pfad anpassen

@Component({
  selector: 'npg-app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    RouterOutlet,
    LayoutDirectionToggleComponent,
    LayoutThemeToggleComponent,
    ComponentsListComponent,
  ],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private componentsListService = inject(ComponentsListService);
  private readonly destroy$ = new Subject<void>();
  private readonly document = inject(NB_DOCUMENT);

  private lastFocusedElement: HTMLElement = this.document.body;
  showToolbar = true;
  showComponentsList = false;
  components$: Observable<ComponentLink[]> = this.componentsListService.components$;

  @ViewChild('componentSearch') componentSearch: ElementRef;

  ngAfterViewInit() {
    if (!this.document) return;

    fromEvent<KeyboardEvent>(this.document, 'keyup')
      .pipe(takeUntil(this.destroy$))
      .subscribe((e: KeyboardEvent) => this.handleButtonPressUp(e));

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.hideComponentsList());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToComponent(): void {
    this.componentSearch.nativeElement.blur();
    this.componentsListService.selectedLink$.pipe(take(1), takeUntil(this.destroy$)).subscribe((selectedLink) => {
      this.router.navigate([selectedLink]);
    });
  }

  toggleToolbar() {
    this.showToolbar = !this.showToolbar;
    if (!this.showToolbar) this.hideComponentsList();
  }

  showComponentList(): void {
    this.showComponentsList = true;
  }

  hideComponentsList(): void {
    this.showComponentsList = false;
  }

  onSearchChange(event): void {
    this.showComponentList();
    this.componentsListService.updateSearch(event.target.value);
  }

  private handleButtonPressUp(e: KeyboardEvent): void {
    if (e.key === 'ArrowDown') this.componentsListService.selectNextComponent();
    if (e.key === 'ArrowUp') this.componentsListService.selectPreviousComponent();
    if (e.key === 'Escape') {
      this.hideComponentsList();
      this.lastFocusedElement.focus();
    }
    if (e.key === '/') {
      this.lastFocusedElement = this.document.activeElement as HTMLElement;
      this.componentSearch.nativeElement.focus();
    }
  }
}
