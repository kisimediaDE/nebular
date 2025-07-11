import { Component } from '@angular/core';
import { NbThemeService } from '@kisimedia/nebular-theme';

@Component({
  selector: 'ngd-example-404',
  template: ` Example not found. `,
  styleUrls: ['./example-404.component.scss'],
  standalone: false,
})
export class NgdExample404Component {
  constructor(private themeService: NbThemeService) {
    this.themeService.changeTheme('default');
  }
}
