import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    DividerModule,
    AvatarModule,
    TimelineModule,
    PanelModule,
    RippleModule,
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
