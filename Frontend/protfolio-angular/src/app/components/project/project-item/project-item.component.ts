import { Component, OnInit } from '@angular/core';
import { IProject } from 'src/app/interfaces/IProject';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css'],
})
export class ProjectItemComponent implements OnInit {
  project!: IProject;
  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this.project = this._projectService.GetProjectById(1)!;
  }
}
