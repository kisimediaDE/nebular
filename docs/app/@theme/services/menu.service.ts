/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbMenuItem } from '@kisimedia/nebular-theme';

import { NgdStructureService } from './structure.service';
import { NgdTextService } from './text.service';

interface IItemLink {
  title: string;
  parent?: {
    link?: string;
  };
}

@Injectable()
export class NgdMenuService {
  constructor(private structureService: NgdStructureService, private textService: NgdTextService) {}

  getPreparedMenu(basePath: string): any {
    return this.prepareMenu(this.structureService.getPreparedStructure(), { link: basePath });
  }

  prepareMenu(structure, parent = null) {
    return structure
      .filter((item) => item.name && item.type !== 'block')
      .map((item: any) => {
        const menuItem: NbMenuItem = {
          title: item.name,
          pathMatch: 'prefix',
          parent: parent,
          data: item,
          group: item.type === 'group',
        };
        menuItem.link = this.createItemLink<NbMenuItem>(menuItem);

        if (item.children && item.children.some((child) => child.type === 'page' || child.type === 'tabs')) {
          menuItem.children = this.prepareMenu(item.children, menuItem);
        }

        return menuItem;
      });
  }

  protected getTocForMd(block: any) {
    return block.children.map((section: any) => ({
      title: section.title,
      fragment: section.fragment,
    }));
  }

  createItemLink<T extends IItemLink>(item: T): string {
    const url = this.textService.createSlag(item.title);

    return item.parent ? `${item.parent.link}/${url}` : url;
  }
}
