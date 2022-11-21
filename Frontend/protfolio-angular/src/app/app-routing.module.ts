import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { ProjectItemComponent } from './components/project/project-item/project-item.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectItemComponent },
  { path: 'posts', component: PostListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
