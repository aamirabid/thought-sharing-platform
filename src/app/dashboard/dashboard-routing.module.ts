import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';
import { CanActivateService } from '../services/guard/can-activate.service';
import { DashboardComponent } from './dashboard.component';
import { MyNotesComponent } from './pages/my-notes/my-notes.component';
import { AddUpdateDialogComponent } from './pages/my-notes/add-update-dialoge/add-update-dialoge.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'notes',
        component: NotesComponent,
        canActivate: [CanActivateService],
      },
      {
        path: 'my-notes',
        component: MyNotesComponent,
        canActivate: [CanActivateService],
      },
      {
        path: 'my-notes/add',
        component: AddUpdateDialogComponent,
        canActivate: [CanActivateService],
      },
      {
        path: 'my-notes/update/:id',
        component: AddUpdateDialogComponent,
        canActivate: [CanActivateService],
      },
      { path: '', pathMatch: 'full', redirectTo: '/auth/notes' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
