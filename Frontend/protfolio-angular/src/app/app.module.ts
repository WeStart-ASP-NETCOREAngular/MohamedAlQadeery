import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectItemComponent } from './components/project/project-item/project-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostItemComponent } from './components/post/post-item/post-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectItemComponent,
    SidebarComponent,
    PostListComponent,
    PostItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
