import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MasterComponent } from './layout/master/master.component';
import { NotesComponent } from './pages/notes/notes.component';
import { MyNotesComponent } from './pages/my-notes/my-notes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUpdateDialogComponent as AddUpdateDialogeComponent } from './pages/my-notes/add-update-dialoge/add-update-dialoge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    MasterComponent,
    NotesComponent,
    MyNotesComponent,
    AddUpdateDialogeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatSelectInfiniteScrollModule,
  ],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}
