import { RouterModule, Routes } from '@angular/router';
import { ListPhotosComponent } from "./list-photos/list-photos.component";

const routes: Routes = [
  { path: 'photos-list', component: ListPhotosComponent },
  { path: '', component: ListPhotosComponent },
  {path: '**', redirectTo: '/'}
];

export const routing = RouterModule.forRoot(routes);
