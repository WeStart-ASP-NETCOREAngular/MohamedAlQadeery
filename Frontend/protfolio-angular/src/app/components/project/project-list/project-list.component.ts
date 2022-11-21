import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/interfaces/IProject';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: IProject[] = [];
  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects = this._projectService.GetAllProjects();
  }
}
