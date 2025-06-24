import { Component  } from '@angular/core';


import { MegaMenuItem, MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

import { Drawer, DrawerModule } from 'primeng/drawer';
import { Button, ButtonModule } from 'primeng/button';
import { StyleClass } from 'primeng/styleclass';
import { MegaMenu } from 'primeng/megamenu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ 
    
    BadgeModule, 
    AvatarModule, 
    InputTextModule, 
    Ripple, 
    CommonModule,
    DrawerModule, 
    ButtonModule, 
    MegaMenu,
    RouterLink
    
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
    
itemsMega: MegaMenuItem[] | undefined;

 

    ngOnInit() {

        this.itemsMega = [            
            {
                label: 'Issues CRUD',
                root: true,
                link:'issues'
            },
            {
                label: 'About project',
                root: true,
                link:'about'
            }
        ];

    }
 
}
